function notEmpty(name) {
  return (v) => {
    if (!v || v.trim === '') {
      return `${name} is required`
    }
    else {
      return true
    }
  }
}
module.exports = function (plop) {
  // 这里定义你的生成器
  plop.setGenerator('test', {
    description: '生成一个页面',
    prompts: [
      {
        type: 'input',
        name: 'dir',
        message: '请输入组件路径 比如 system/user、system/user/edit',
        validate: notEmpty('dir'),
      },
      {
        type: 'input',
        name: 'title',
        message: '请输入页面标题，允许空（比如：我的订单）',
      },
      {
        type: 'rawlist',
        name: 'level',
        message: '请输入页面等级，默认一级',
        default: 0,
        choices: [
          {
            name: '一级',
            value: 1,
          },
          {
            name: '二级',
            value: 2,
          },
          {
            name: '三级',
            value: 3,
          },
          {
            name: '四级',
            value: 4,
          },
        ],
      },
      {
        type: 'checkbox',
        name: 'blocks',
        message: '路由配置:',
        choices: [
          {
            name: '是否缓存组件',
            value: 'keepAlive',
            checked: false,
          },
        ],
      },
    ],
    actions: (data) => {
      const dir
              = data.dir.indexOf('/') === 0 ? data.dir.substring(1) : data.dir
      const name = dir
      const { title, level } = data
      const actions = [
        {
          force: true,
          type: 'add',
          path: `src/pages/${name}/index.vue`,
          templateFile: 'plop-templates/page/index.hbs',
          data: {
            name,
            title,
            level,
            keepAlive: data.blocks.includes('keepAlive'),
          },
        },
      ]

      return actions
    },
  })
}
