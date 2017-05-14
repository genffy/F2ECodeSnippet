const findInFiles = require('find-in-files')
const path = require('path')
const fs = require('fs')

let JSONData = []
function findApiUse(repoPath, callback) {
  let pkg = null, cortex = null
  try {
    pkg = require(`${repoPath}/package.json`)
  }catch(e) {
    console.log(`${repoPath} not have package.json file`)
  }
  try {
    cortex = require(`${repoPath}/cortex.json`)
  }catch(e) {
    console.log(`${repoPath} not have cortex.json file`)
  }
  let version = null, name = null, type = null
  if(pkg && pkg['dependencies'] && (pkg['dependencies']['@dp/dpzeus'])) {
    // 通过 npm 使用 dpzeus的
    type = 'npm'
    version = pkg['dependencies']['@dp/dpzeus']
    name = '@dp/dpzeus'
  }

  if(cortex && cortex['dependencies']) {
    // 通过 cortex 使用的
    type = 'cortex'
    if(cortex['dependencies']['dpmerchant']){
      version = cortex['dependencies']['dpmerchant']
      name = 'dpmerchant'
    }
    if(cortex['dependencies']['dpzeus']){
      version = cortex['dependencies']['dpzeus']
      name = 'dpzeus'
    }
    if(cortex['dependencies']['dpapp-apollo']){
      version = cortex['dependencies']['dpapp-apollo']
      name = 'dpapp-apollo'
    }
    if(cortex['dependencies']['dpapp']){
      version = cortex['dependencies']['dpapp']
      name = 'dpapp'
    }
  }
  // get api
  findInFiles.find({'term': /(DPMer|DPApp|Dpzeus|dpzeus)\.\w+/, 'flags': 'gi'}, repoPath, '.(js|jsx|es6)$')
  .then(function(results) {
    callback && callback(results, {
      type: type,
      version: version,
      name: name
    })
  })
}
module.exports = findApiUse
