# word-raindrop

基于Canvas实现黑客帝国文字雨特效的JavaScript库。

![demo](/data/demo.gif)

## 安装使用

### 通过NPM安装，import导入

``` bash
npm install word-raindrop
```
``` javascript
import WordRaindrop from 'word-raindrop';
```

### 通过Script标签引入

``` html
<script src="https://unpkg.com/word-raindrop/dist/index.min.js"></script>
```
### 示例

点击[DEMO](https://imkch.github.io/word-raindrop/examples/index.html)查看
``` html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <title>基于Canvas实现黑客帝国文字雨特效</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/word-raindrop/dist/index.min.js"></script>
    <script>
      new WordRaindrop('app');
    </script>
  </body>
</html>
```

## API说明

### 类

- **WordRaindrop(target, options)**
  - 说明：初始化实例，创建对象
  - 参数：
    - target（必填）
      - 类型：String || Element
      - 说明：挂载canvas的dom节点id或对象
    - options
      - 类型：Object || undefined
      - 说明：渲染参数
      - 示例：
      ```javascript
      const options = {
        text: '01', // 流动的字符
        fontSize: 18, // 字体大小，单位像素
        fontFamily: 'arial', // 字体
        textColor: 'rgba(255, 255, 255, 1)', // 字体颜色
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // 背景颜色，必须设置透明度
        speed: 8 // 流动速度，值为1速度最快
      };
      ```
  - 示例：
  ```javascript
  new WordRaindrop('app', options);
  ```

## 版本更新说明

- **1.0.0**
  - 根据画布大小绘制初始字符
  - 添加动画，循环绘制字符
