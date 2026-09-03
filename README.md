# LogicStorm

LogicStorm 官方主页（静态站点），部署地址：https://www.logicstorm.cn/

## 页面

- `index.html` — 首页
- `workbench.html` — 产品工作台（Everyday / Hibrush / Lead Hub / Everybuddy 入口）
- `huoke/` — 货客 · 多平台合规获客系统落地页
- `about.html` / `services.html` / `cases.html` / `contact.html` / `privacy.html` — 官网常规页面

## 部署

纯静态站点，文件直接部署到 nginx 站点根目录（`/var/www/html`）即可。

```bash
# 本地预览
python3 -m http.server 8080
```

## 说明

- 页面资源引用为相对路径（`assets/...`），支持子路径部署。
- 站点为纯 HTML/CSS/JS，无构建步骤。
