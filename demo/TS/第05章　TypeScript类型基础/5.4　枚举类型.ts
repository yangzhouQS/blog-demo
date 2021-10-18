enum Season {
    Spring,
    Summer,
    Fall,
    Winter
}

console.log(Season)
/*
{
    '0': 'Spring',
    '1': 'Summer',
    '2': 'Fall',
    '3': 'Winter',
    Spring: 0,
    Summer: 1,
    Fall: 2,
    Winter: 3
}*/

// 1. 数值类型枚举
enum Direction {
    Up, // 0
    Down, // 1
    Left, // 2 
    Right// 3
}

// 自定义枚举属性的初始化值
enum Direction2 {
    Up = 1,
    Down, // 2
    Left = 10,
    Right//11
}

// 2.字符串枚举
enum Direction3 {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
}

console.log(Direction3) // { Up: 'UP', Down: 'DOWN', Left: 'LEFT', Right: 'RIGHT' }

// 3.异构枚举: 允许枚举成员和字符串枚举成员
enum Color {
    Black = 0,
    White = 'White',
    // Pink = 1 + 1 // 不允许使用计算的值作为枚举成员的初始值
}
