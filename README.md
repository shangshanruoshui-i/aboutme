# 施俊杰 · Personal Website

一个可直接部署到 GitHub Pages 的静态个人网站，包含个人介绍、项目作品、工作经历、科研成果、学习日志和邮箱联系方式。

## 本地预览

在当前目录运行任意静态服务器，例如：

```bash
python -m http.server 4173
```

然后打开 `http://localhost:4173`。

## 发布到 GitHub Pages

1. 新建名为 `你的用户名.github.io` 的 GitHub 仓库。
2. 将本目录中的文件推送到仓库的 `main` 分支。
3. 在仓库 Settings → Pages 中选择 `Deploy from a branch`，分支选择 `main` / `/ (root)`。
4. 等待构建完成后访问 `https://你的用户名.github.io/`。

## 如何添加作品

在 `script.js` 顶部的 `projects` 数组中新增一项即可。可用分类为 `agent`、`vision`、`engineering`；项目链接填入 `href`，标签填入 `tags`。

## 如何每天更新学习日志

打开 `content/posts.js`，把新的文章对象放在 `window.sitePosts` 数组最前面。最少填写 `id`、`category`、`date`、`title`、`summary`、`tags` 和 `body`；`body` 使用简单 HTML，支持段落、二级标题、列表、引用和代码块。保存后，首页最近记录、博客归档和文章详情页会自动同步。

文章如果有配图，将图片放到 `assets/covers/`，然后把路径写入 `cover`；如果要附上 PPT 或其他文件，把文件放到 `assets/projects/` 并填写 `asset`。

## 需要替换的内容

- `index.html`：替换邮箱等联系方式时，在导航、"关于我"和联系区修改对应链接。
- `styles.css`：集中管理颜色、字体和响应式布局。
