const importExcel = async ctx => {
  // 参数解析
  const { orgId, userId } = ctx.extras
  const { type, file, isLocal } = ctx.request.body
  // 初始化 excel 导入导出配置
  await initTable()
  const context = Object.assign({}, ctx.extras, ctx.request.body) // 操作上下文数据，后续添加：key=sheetName, JSON。存储处理每个 sheet 所需的属性值
  const memoryUsage = process.memoryUsage().rss / 1024 / 1024
  let taskId
  // 生成进度id后返回
  if (!type) {
    // 根据 excel 文件内容自动配置导入
    taskId = await taskManager.start({
      type: TASK_TYPE,
      product: PRODUCT,
      operate: OPERATE_IMPORT,
      userId,
      stepTotal: STEP_COUNT_IMPORT_EX,
      title: TITLE_IMPORT
    })
    const taskInfo = `执行导入前内存占用：${ memoryUsage } M。任务id：${ taskId }。\r\n执行参数：${ JSON.stringify(
      context
    ) }。`
    taskManager.log(taskId, taskInfo)
    // 添加任务信息(组织 orgId 下的用户 userId 向 mainId 中导入 file，导入配置为 config)
    taskInfos[taskId] = { redis, context, memory: process.memoryUsage().rss }
    // 异步导入数据
    importExcelServiceEx.execute(taskId)
    // 返回结果
  } else {
    Assert.isTrue(excelConfig[type] && excelConfig[type].import, errorCode.importConfigNotFound, type)
    // 验证输入参数
    checkParams(context, excelConfig[type].import.validParams || [])
    // 根据是否允许一个组织下只能有一个用户导入数据
    let lockKey = null
    if (importLock[type]) {
      // 获取悲观锁
      lockKey = `task:lock:excel:import:${ orgId }`
      const lock = await redis.get(lockKey)
      if (lock) {
        const user = await rpc.get({ path: `/users/${ lock }`, timeout: 10000 }, { serviceId: 'user-service' })
        Assert.isTrue(
          false,
          errorCode.otherLock,
          `${ user ? `用户【${ user.name }】` : `id 为 【${ lock }】 的用户` }`,
          importLock[type]
        )
      }
      // 添加悲观锁，5分钟过期
      await redis.setex(lockKey, 300, userId)
    }
    taskId = await taskManager.start({
      type: TASK_TYPE,
      product: PRODUCT,
      operate: OPERATE_IMPORT,
      userId,
      stepTotal: STEP_COUNT_IMPORT,
      title: TITLE_IMPORT
    })
    const taskInfo = `执行导入前内存占用：${ memoryUsage } M。任务id：${ taskId }。\r\n执行参数：${ JSON.stringify(
      context
    ) }。`
    taskManager.log(taskId, taskInfo)
    // 添加任务信息(组织 orgId 下的用户 userId 向 mainId 中导入 file，导入配置为 config)
    taskInfos[taskId] = {
      sequelize: sequelize[excelConfig[type].import.datasource],
      redis,
      context,
      config: excelConfig[type].import,
      file,
      isLocal,
      memory: process.memoryUsage().rss
    }
    if (lockKey) {
      taskInfos[taskId].context.lockKey = lockKey
    }
    // 异步导入数据
    importExcelService.execute(taskId)
    // 返回结果
  }
  ctx.body = { taskId }
}