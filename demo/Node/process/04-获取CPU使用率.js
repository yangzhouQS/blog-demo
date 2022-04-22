const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function _getPs() {
  const cmd = `ps -p ${ process.pid } -o pid,rss,vsz,pcpu,comm`

  // 获取执行结果
  const { stdout, stderr } = await exec(cmd)
  if (stderr) {
    console.log(stderr)
    return false
  }
  return stdout
}

async function _getWmic() {

}

async function _parseInOs() {

}

async function _getProcessInfo() {
  let pidInfo, cpuInfo;

  // windows平台
  if (platform === 'win32') {
    pidInfo = await _getWmic()
  } else {
    pidInfo = await _getPs()
    cpuInfo = await _parseInOs(pidInfo)
  }
  if (!cpuInfo) {
    return false
  }
}



async function check(maxOverloadNum = 30, maxCpuPercentage = 80) {
  /// 定时处理逻辑
  setInterval(async () => {
    try {
      const cpuInfo = await this._getProcessInfo();
      if (!cpuInfo) { // 异常不处理
        return;
      }
      if (cpuInfo > maxCpuPercentage) {
        overloadTimes++;
      } else {
        overloadTimes = 0;
        return isOverload = false;
      }
      if (overloadTimes > maxOverloadNum) {
        isOverload = true;
      }
    } catch (err) {
      console.log(err);
      return;
    }
  }, 2000);
}
