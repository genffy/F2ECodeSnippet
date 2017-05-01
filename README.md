F2ECodeSnippet
==============
收集或整理在前端开发过程中，一些解决方案和开发实践

---
####监听scss
```bash
sass --watch /path/to/scss/source:/path/to/css/output
```

####babel转换js
```bash
babel script.js --out-file script-compiled.js
# or watch it
babel script.js --watch --out-file script-compiled.js
```

### 自动生成目录链接
- 扫描目录收集各个模块（是否需要个配置文件）
- 纯静态页面跳转吧。