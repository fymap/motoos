'use strict'
const { exec } = require('child_process');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })
  fastify.get('/info', (request, reply) => {
    let cmdStr = 'cat /etc/*-release | grep -E "^NAME|^VERSION"'
    exec(cmdStr, (err, stdout, stderr) => { 
      if (err) {
        console.log('get linux info error:' + err)
        reply.send(err)
      } else {
        console.log('get linux info:' + stdout)
        reply
          .type('text/plain; charset=utf-8')
          .send("命令行执行结果：\n" +
        "Linux System:" +
        stdout +
        "\nRAM:" +
        os.totalmem() / 1000 / 1000 +
        "MB")
      }
    })
  })
}
