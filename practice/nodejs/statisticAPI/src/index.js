const HTTP = require('http')
const fs = require('fs')
const path = require('path')
const notifier = require('node-notifier')

const cloneRepo = require('./cloneRepo')
const getApiUse = require('./getApiUse')
const url = require('../config.json').repo_list_url

const req = HTTP.get(url, (res) => {
  res.setEncoding('utf8')
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      const projects =parsedData.projects
      const JSONData = []
      let errorNum = 0
      projects.forEach((item)=>{
        const repoPath = `${process.cwd()}/repos/${item.name}`
        cloneRepo({
          url: item.http_url_to_repo,
          name: item.name
        }, (repo)=>{
          // get project done
          getApiUse(repoPath, (results, params)=>{
            try{
              const apis = []
              for (const result in results) {
                  const resData = results[result]
                  const apiObj = {}
                  if(resData.matches.length != 0){
                      resData.matches.map((m)=>{
                        const apiName = m.split('.')[1]
                          if(apiObj[apiName]){
                              apiObj[apiName] ++
                          }else{
                              apiObj[apiName] = 1
                          }
                      })
                  }
                  apis.push({
                      [path.relative(repoPath, result)]: apiObj
                  })
              }
              JSONData.push({
                name: item.name,
                meta: item,
                params: params,
                apis: apis
              })
              // write file
              if(JSONData.length == (projects.length - errorNum)){
                notifier.notify('start to write data.json data')
                const jsonFilePath = `${process.cwd()}/data.json`
                try{
                  // init data file 
                  fs.writeFile(jsonFilePath, JSON.stringify(JSONData), 'utf8', ()=>{
                    notifier.notify('write data.json data done')
                  })
                }catch(e){
                  notifier.notify('write json file ${jsonFilePath} error', e)
                }
              }
             }catch(e){
              console.log('error ', e)
            }
          })
        }, (error)=>{
          errorNum++
          console.error('clone error', error)
        })
      })
    } catch (e) {
      console.error(e.message)
    }
  });
})
req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});
req.end();