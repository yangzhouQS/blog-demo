# 1.初识RUST

## rust历史简介





## rust开发环境搭建







## 运行HelloWord













# 2.变量与数据类型

## 变量和可变性

```
/*
1.变量区分为可变与不可变两种状态
2.变量遮蔽允许同名变量的覆盖

*/
fn main() {
    //1.变量声明
    let a = 100;
    println!("a = {}", a);

    // 2.变量的可变性
    let x = 100;
    // let声明的变量是只读的,禁止修改值
    // x = 200; // cannot assign twice to immutable variable `x`
    println!("x = {}", x);

    // 声明可变变量可以在变量前加上mut
    let mut y = 100;
    y = y + 99;
    println!("y = {}", y);


    // 3.变量遮蔽
    let a1 = 100;
    println!("a1 = {}", a1); // a1 = 100
    let a1 = 200;
    println!("a1 = {}", a1); // a1 = 200

    // 4. 常量,常量是绑定到标识符不允许改变的值
    // 常量必须指定数据类型,建议大写变量标识符
    const PI: f64 = 3.1415906;
    println!("PI = {}", PI)
}
```



## 基本数据类型

```
/*
基本数据类型
1. 整型
2. 浮点数
3. 布尔数据类型
4. 字符类型
5. 范围类型
*/
fn main() {
    // 1. 整数类型
    let inter1: u8 = 100; // 无符号8位
    let inter2: i8 = 100; // 有符号8位
    let _inter3: i16 = 1080; // 有符号16位
    let _inter4: i32 = 1200; // 有符号32位

    // help: if this is intentional, prefix it with an underscore: `_inter5`
    // let inter5: i64 = 1300; // 有符号64位 // 定义的变量未使用,建议变量名称前面使用下划线解决
    let _inter5: i64 = 1300; // 有符号64位
    let inter6: u128 = 1000000; // 有符号128位
    println!("inter1={}\ninter2={}", inter1, inter2);
    println!("inter6={}", inter6);

    let a1: u32 = 0b100001; // 二进制
    let a2: u32 = 0o21; // 八进制
    let a3: u32 = 0x111; // 十六进制
    println!("a1={} \na2={} \na3={}", a1, a2, a3);

    // 2. 浮点数,
    // f32:单精度浮点型
    // f64:双精度浮点型
    let f: f32 = 3.14;
    let f2: f64 = 3.151515151515;
    println!("f={}\nf2={}", f, f2);

    //3.布尔数据类型
    let b1: bool = false;
    let b2 = true;
    println!("b1={},b2={}", b1, b2);

    // 4.字符类型,每个字符占四个字节
    let z = 'z';
    let q: char = '1';
    println!("z = {},1={}", z, q);

    // 5.范围类型
    for index in 1..5 {
        println!("index = {}", index);
    }
    print!("包含5");
    for index in 1..=5 {
        println!("index = {}", index);
    }
    print!("逆序\n");
    for index in (1..=5).rev() {
        println!("index = {}", index);
    }
    print!("求和\n");
    let sum: u32 = (1..=5).sum();
    println!("sum = {}", sum);
}

```

**运行结果**

```
inter1=100
inter2=100
inter6=1000000
a1=33 
a2=17 
a3=273
f=3.14
f2=3.151515151515
b1=false,b2=true
z = z,1=1
index = 1
index = 2
index = 3
index = 4
包含5index = 1
index = 2
index = 3
index = 4
index = 5
逆序
index = 5
index = 4
index = 3
index = 2
index = 1
求和
sum = 15
```

## 复合数据类型



### 元组

Rust 中元组的定义很简单，就是使用一对小括号 `()` 把所有元素放在一起，元素之间使用逗号 `,` 分隔。

定义元组数据类型的时候也是一样的。

但需要注意的是，如果显式指定了元组的数据类型，那么数据类型的个数必须和元组的个数相同，否则会报错。

当元组只有一个元素是尾部需要使用逗号, 区分是括号运算符还是元组.





### 数组

虽然我们看到的绝大多数变量都是基本数据类型。虽然这些基本数据类型的能够满足大部分的工作，但它们不是万能的。

基本数据类型的变量也有它们的局限性。

- 基本数据类型的变量本质上是 **标量**。这意味着每个基本数据类型的变量一次只能存储一个值。

  因此，当我们需要存储多个值的时候，我们不得不重复定义多个变量。比如 `a1`、`a2`、`a3` ....

  如果我们要存储的值非常多，成百上千，这种重复定义变量的方法是行不通的。

- 基本数据类型的变量的值在内存中的位置是随机的。多个按照顺序定义的变量，它们在内存中的存储位置不一定是连续的。因此我们可能按照变量的声明顺序来获取它们的值。

**数组** 是用来存储一系列数据，但它往往被认为是一系列相同类型的变量，也就是说，数组 是可以存储一个固定大小的相同类型元素的顺序集合。

数组的声明并不是声明一个个单独的变量，比如 number0、number1、...、number99，而是声明一个数组变量，比如 numbers，然后使用 numbers[0]、numbers[1]、...、numbers[99] 来代表一个个单独的变量。 数组中的特定元素可以通过索引访问

数组可以理解为相同数据类型的值的集合



>  数组特性

- 数组的定义其实就是为分配一段 **连续的相同数据类型** 的内存块。

- 数组是静态的。这意味着一旦定义和初始化，则永远不可更改它的长度。

- 数组的元素有着相同的数据类型，每一个元素都独占者数据类型大小的内存块。
  也就是说。数组的内存大小等于数组的长度乘以数组的数据类型。

- 数组中的每一个元素都按照顺序依次存储，这个顺序号既代表着元素的存储位置，也是数组元素的唯一标识。我们把这个标识称之为 **数组下标** 。

  注意，数组下标从 `0` 开始。

- 填充数组中的每一个元素的过程称为 **数组初始化**。也就是说 **数组初始化** 就是为数组中的每一个元素赋值。

- 可以更新或修改数组元素的值，但不能删除数组元素。如果要删除功能，你可以将它的值赋值为 0 或其它表示删除的值。



> 声明和初始化数组

Rust 语言为数组的声明和初始化提供了 3 中语法

1. 最基本的语法，指定每一个元素的初始值

   ```
   let variable_name:[dataType;size] = [value1,value2,value3];
   ```

   例如

   ```
   let arr:[i32;4] = [10,20,30,40];
   ```

2. 省略数组类型的语法

   因为指定了每一个元素的初始值，所以可以从初始值中推断出数组的类型

   ```
   let variable_name = [value1,value2,value3];
   ```

   例如

   ```
   let arr = [10,20,30,40];
   ```

3. 指定默认初始值的语法，这种语法有时候称为 **默认值初始化**。

   如果不想为每一个元素指定初始值，则可以为所有元素指定一个默认的初始值。

   ```
   let variable_name:[dataType;size] = [default_value_for_elements,size];
   ```

   例如下面的代码为每一个元素指定初始值为 `-1`

   ```
   let arr:[i32;4] = [-1;4];
   ```

```
// 2.1 声明和初始化数组
    // a>指定数组数据类型和初始化长度进行初始化
    let arr: [i64; 5] = [1, 2, 3, 4, 56];
    println!("arr = {:?}", arr);

    // b>省略数组类型进行初始化
    let arr2 = ["a", "b", "c"];
    println!("arr2 = {:?}", arr2);

    // c>默认值初始化
    let arr3: [i32; 5] = [8; 5];
    println!("arr3 = {:?}", arr3); // arr3 = [8, 8, 8, 8, 8]
```







## 结构体

数组永远只能保存相同类型的元素。从某些方面说，数组是相同类型元素的集合。

但世界并不是那么美好的，永远都是复制克隆类的东西，很多东西往往比较复杂。

比如我们要描述一个 **人**，它有着年龄，有着姓名，有着居住地址。如果我们要存储这些东西，数组是指望不上了。

为了解决这里问题，语言的开发者们想到了另一种可以让用户自定义类型的方法，那就是 **结构体（ `struct` ）**。

结构体，其实就是 **结构**，日常生活中，当我们提及某某结构的时候，都会分析说它是由什么什么组成的。比如当我们分析一张 **桌子** 的时候，我们会说它有 4 条腿，有一个桌面，有几个横杠...

**结构体** 就是可以组合不同类型的数据项，包括另一个结构。



> 定义一个结构体

几乎所有有结构体这个概念的语言，定义结构体的关键字都是一样的，那就是 `struct`。

因为结构体是一个集合，也就是 **复合类型**。结构体中的所有元素/字段也必须明确指明它的数据类型。

定义一个结构体的语法格式如下

```
struct Employee { // 定义结构体
        name: String,
        company: String,
        age: u32,
}
```

定义一个结构体时：

1. 结构体名 `Employee` 和元素/字段名 `fieldN` 遵循普通变量的命名语法。
2. 结构体中中的每一个元素/字段都必须明确指定数据类型。可以是基本类型，也可以是另一个结构体。

`范例`

下面的代码，我们定义了一个结构体 `Employee` ，它有着三个元素/字段，分别是姓名、年龄、公司。

```
struct Employee {
   name:String,
   company:String,
   age:u32
}
```



> 创建结构体的实例（也称为结构体初始化）

创建结构体的实例或者说结构体初始化本质上就是创建一个变量。使用 `let` 关键字创建一个变量。

创建结构体的一个实例和定义结构体的语法真的很类似。但说起来还是有点复杂，我们先看具体的语法

### 结构体初始化语法

```
let instance_name = Name_of_structure {
   field1:value1,
   field2:value2,
   field3:value3
}; 
```

从语法中可以看出，初始化结构体时的等号右边，就是把定义语法中的元素类型换成了具体的值。

结构体初始化，其实就是对 **结构体中的各个元素进行赋值**。

> #### 注意
>
> 千万不要忘记结尾的分号 `;`

### 访问结构体实例元素的语法

如果要访问结构体实例的某个元素，我们可以使用 **元素访问符**，也就是 **点号 ( `.` )**

具体的访问语法格式如下

```
struct_name_instance.field_name
```

例如，如果要访问 `Employee` 的实例 `emp1` 中的 `name` 元素，可以如下使用

```
emp1.name
```

`范例`

下面的代码，我们定义了一个有三个元素的结构体 Employee，然后初始化一个实例 `emp1`，最后通过 **元素访问符** 来访问 `emp1` 的三个元素。

```
struct Employee {
   name:String,
   company:String,
   age:u32
}

fn main() {
   let emp1 = Employee {
      company:String::from("TutorialsPoint"),
      name:String::from("Mohtashim"),
      age:50
   };
   println!("Name is :{} company is {} age is {}",emp1.name,emp1.company,emp1.age);
}
```

编译运行以上 Rust 代码，输出结果如下

```
Name is :Mohtashim company is TutorialsPoint age is 50
```

### 修改结构体实例

修改结构体实例就是对结构体的个别元素 **重新赋值**。

结构体实例默认是 **不可修改的**，因为结构体实例也是一个使用 `let` 定义的变量。

如果要修改结构体实例，就必须在创建时添加 `mut` 关键字，让它变成可修改的。

因为没啥新的知识内容，我们就直接上范例吧。

`范例`

下面的范例给 Employee 的实例 emp1 添加了 `mut` 关键字，因此我们可以修改 emp1 的内部元素。

```
struct Employee {
   name:String,
   company:String,
   age:u32
}

let mut emp1 = Employee {
   company:String::from("TutorialsPoint"),
   name:String::from("Mohtashim"),
   age:50
};
emp1.age = 40;
println!("Name is :{} company is {} age is 
{}",emp1.name,emp1.company,emp1.age);
```

编译运行以上 Rust 代码，输出结果如下

```
Name is :Mohtashim company is TutorialsPoint age is 40
```

## 结构体作为函数的参数

结构体的用途之一就是可以作为参数传递给函数。

定一个结构体参数和定义其它类型的参数的语法是一样的。我们这里就不多介绍了，直接看范例

下面的代码定义了一个函数 `display` ，它接受一个 `Employee` 结构体实例作为参数并输出结构体的所有元素

```
fn display( emp:Employee) {
   println!("Name is :{} company is {} age is 
   {}",emp.name,emp.company,emp.age);
}
```

完整的可运行的实例代码如下

```
//定义一个结构体
struct Employee {
   name:String,
   company:String,
   age:u32
}
fn main() {
   //初始化结构体
   let emp1 = Employee {
      company:String::from("TutorialsPoint"),
      name:String::from("Mohtashim"),
      age:50
   };
   let emp2 = Employee{
      company:String::from("TutorialsPoint"),
      name:String::from("Kannan"),
      age:32
   };
   //将结构体作为参数传递给 display
   display(emp1);
   display(emp2);
}

// 使用点号(.) 访问符访问结构体的元素并输出它么的值
fn display( emp:Employee){
   println!("Name is :{} company is {} age is 
   {}",emp.name,emp.company,emp.age);
}
```

编译运行以上 Rust 代码，输出结果如下

```
Name is :Mohtashim company is TutorialsPoint age is 50
Name is :Kannan company is TutorialsPoint age is 32
```

## 结构体实例作为函数的返回值

Rust 中的结构体不仅仅可以作为函数的参数，还可以作为 **函数的返回值**。

函数返回结构体实例需要实现两个地方：

1. 在 **箭头 `->`** 后面指定结构体作为一个返回参数。
2. 在函数的内部返回 **结构体的实例**

### 结构体实例作为函数的返回值的语法格式

```
struct My_struct {}

fn function_name([parameters]) -> My_struct {
   // 其它的函数逻辑
   return My_struct_instance;
}
```

### 范例

下面的代码，我们首先定义一个结构体 `Employee` ，接着定义一个方法 `who_is_elder` ，传入两个结构体 `Employee` 作为参数并返回年龄个大的那个。

```
fn main() {

   let emp1 = Employee{
      company:String::from("TutorialsPoint"),
      name:String::from("Mohtashim"),
      age:50
   };
   let emp2 = Employee {
      company:String::from("TutorialsPoint"),
      name:String::from("Kannan"),
      age:32
   };
   let elder = who_is_elder(emp1,emp2);
   println!("elder is:");

   display(elder);
}

//接受两个 Employee 的实例作为参数并返回年长的那个
fn who_is_elder (emp1:Employee,emp2:Employee)->Employee {
   if emp1.age>emp2.age {
      return emp1;
   } else {
      return emp2;
   }
}

// 显示结构体的所有元素
fn display( emp:Employee) {
   println!("Name is :{} company is {} age is {}",emp.name,emp.company,emp.age);
}

// 定义一个结构体
struct Employee {
   name:String,
   company:String,
   age:u32
}
```

编译运行以上 Rust 代码，输出结果如下

```
elder is:
Name is :Mohtashim company is TutorialsPoint age is 50
```

## 结构体中的方法

Rust 中的结构体可以定义 **方法 ( method )**。

**方法 ( method )** 是一段代码的 **逻辑组合**，用于完成某项特定的任务或实现某项特定的功能。

**方法（ method ）** 和 **函数（ function）** 有什么不同之处呢？

简单的说：

1. **函数（ function）** 没有属主，也就是归属于谁，因此可以直接调用。
2. **方法（ method ）** 是有属主的，调用的时候必须指定 **属主**。
3. **函数（ function）** 没有属主，同一个程序不可以出现两个相同签名的函数。
4. **方法（ method ）** 有属主，不同的属主可以有着相同签名的方法。

定义方法时需要使用 `fn` 关键字。

> `fn` 关键字是 `function` 取头尾两个字母的缩写。

结构体方法的 **作用域** 仅限于 **结构体内部**。

与 [C++ 语言](https://www.twle.cn/l/yufei/cplusplus/cplusplus-basic-index.html) 中的结构体的方法不同的是，Rust 中的结构体方法只能定义在结构体的外面。

在定义结构体方法时需要使用 `impl` 关键字，语法格式如下

```
struct My_struct {}

impl My_struct { 
   // 属于结构体的所有其它代码
}
```

`impl` 关键字最重要的作用，就是定义上面我们所说的 **方法的属主**。所有被 `impl My_struct` 块包含的代码，都只属于 `My_struct` 这个结构。

> `impl` 关键字是 `implement` 的前 4 个字母的缩写。意思是 **实现**。

结构体的普通方法（后面我们还会学到其它方法）时，第一个参数永远是 `&self` 关键字。`self` 是 **自我** 的意思，`&self` 永远表示着当前的结构体的一个实例。

这是不是可以带来其它的结构体方法的解释：结构体的方法就是用来操作当前结构体的一个实例的。

### 结构体方法的定义语法

定义结构体方法的语法格式如下

```
struct My_struct {}
impl My_struct { 

   // 定义一个结构体的普通方法
   fn method_name(&self[,other_parameters]) { 
      //方法的具体逻辑代码
   }

}
```

`&self` 是结构体普通方法固定的第一个参数，其它参数则是可选的。

即使结构体方法不需要传递任何参数，`&self` 也是固定的，必须存在的。像下面这种定义方法是错误的

```
struct My_struct {}
impl My_struct { 

   //定义一个结构体的普通方法
   fn method_name([other_parameters]) { 
      //方法的具体逻辑代码
   }
}
```

### 结构体方法内部访问结构体元素

因为我们在定义方法时固定传递了 `&self` 关键字。而 `&self` 关键字又代表了当前方法的属主。

因此我们可以在方法内部使用 `self.` 来访问结构体的元素。

详细的语法格式如下

```
struct My_struct {
   age: u32
}

impl My_struct { 

   //定义一个结构体的普通方法
   fn method_name([other_parameters]) {

      self.age = 28;

      println!("{}",self.age);

      //其它的具体逻辑代码
   }
}
```

### 结构体方法的调用语法

因为结构体的方法是有属主的，所以调用的时候必须先指定 **属主**，调用格式为 `属主.方法名(方法参数)`。

详细的调用语法格式为

```
My_struct.method_name([other_parameters])
```

> #### 注意
>
> 虽然定义方法时需要固定 `&self` 作为第一个参数，但在调用的时候是 **不需要也不能** 传递的。这个参数的传递 Rust 编译器会 **偷偷的** 帮我们完成。

### 范例

下面的代码，我们首先定义了一个结构体 `Rectangle` 用于表示一个 **长方形**，它有**宽高** 两个元素 `width` 和 `height`。

然后我们又为 结构体 `Rectangle` 定义了一个方法 `area` 用于计算当前 **长方形实例** 的面积。

```
// 定义一个长方形结构体
struct Rectangle {
   width:u32, height:u32
}

// 为长方形结构体定义一个方法，用于计算当前长方形的面积
impl Rectangle {
   fn area(&self)->u32 {
      // 在方法内部，可以使用点号 `self.` 来访问当前结构体的元素。use the . operator to fetch the value of a field via the self keyword
      self.width * self.height
   }
}

fn main() {
   // 创建 Rectangle 结构体的一个实例
   let small = Rectangle {
      width:10,
      height:20
   };

   //计算并输出结构体的面积
   println!("width is {} height is {} area of Rectangle 
   is {}",small.width,small.height,small.area());
}
```

编译运行以上 Rust 代码，输出结果如下

```
width is 10 height is 20 area of Rectangle is 200
```

## 结构体的静态方法

Rust 中的结构体还可以有静态方法。

静态方法可以直接通过结构体名调用而无需先实例化。

结构体的静态方法定义方式和普通方法类似，唯一的不同点是 **不需要使用 `&self` 作为参数**。

### 定义静态方法的语法

结构体静态方法的定义语法格式如下

```
impl Structure_Name {

   // Structure_Name 结构体的静态方法
   fn method_name(param1: datatype, param2: datatype) -> return_type {
      // 方法内部逻辑
   }

}
```

静态方法和其它普通方法一样，参数是可选的。也就是可以没有参数

### 调用静态方法的语法

静态方法可以直接通过结构体名调用，而无需先实例化。

结构体的静态方法需要使用 `structure_name::` 语法来访问，详细的语法格式如下

```
structure_name::method_name(v1,v2)
```

### 范例

下面的范例，我们为结构体 `Point` 定义了一个静态方法 `getInstance()`。

`getInstance()` 是一个 **工厂方法**，它初始化并返回结构体 `Point` 的实例。

```
//声明结构体 Point
struct Point {
   x: i32,
   y: i32,
}

impl Point {
   // 用于创建 Point 实例的静态方法
   fn getInstance(x: i32, y: i32) -> Point {
      Point { x: x, y: y }
   }
   // 用于显示结构体元素的普通方法
   fn display(&self){
      println!("x ={} y={}",self.x,self.y );
   }
}
fn main(){

   // 调用静态方法
   let p1 = Point::getInstance(10,20);
   p1.display();

}
```

编译运行以上 Rust 代码，输出结果如下

```
x =10 y=20
```



















































































































