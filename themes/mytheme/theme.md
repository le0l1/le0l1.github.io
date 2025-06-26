# mytheme 主题风格说明

## 1. 主题配色
- 主色调：黑白灰
- 背景色：#fff（白色）
- 主文字色：#111、#222、#333（深灰/黑）
- 辅助灰色：#f5f5f5、#fafafa、#ededed、#e0e0e0
- 无彩色风格，整体极简、现代

## 2. 表格样式
- 表格背景：白色
- 表头背景：#f5f5f5
- 表头文字：#222
- 表格边框：#e0e0e0、#ededed
- 隔行变色：#fafafa
- 悬停高亮：#f0f0f0
- 圆角：8px
- 阴影：0 2px 8px rgba(0,0,0,0.04)
- 字体大小：15px
- 参考 CSS：

```css
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  overflow: hidden;
  margin: 1.5em 0;
}
th, td {
  padding: 12px 16px;
  text-align: left;
  font-size: 15px;
}
th {
  background: #f5f5f5;
  color: #222;
  font-weight: 600;
  border-bottom: 2px solid #e0e0e0;
}
tr:nth-child(even) td {
  background: #fafafa;
}
tr:hover td {
  background: #f0f0f0;
}
td {
  border-bottom: 1px solid #ededed;
  color: #333;
}
table:last-child td {
  border-bottom: none;
}
```

## 3. 布局
- 最大内容宽度：800px，居中显示
- header 顶部导航，白底灰线，左右分布
- 博文内容区有适当留白
- 响应式设计可根据需要扩展

## 4. 字体
- 系统无衬线字体（sans-serif）
- 标题加粗，正文常规
- 字体大小适中，行高 1.7

## 5. 其他细节
- 搜索框圆角、简洁
- 标签下划线点状，主色
- 博文分隔线为浅灰色

---

如需自定义配色、布局或细节，可在 `source/css/style.css` 中调整。 