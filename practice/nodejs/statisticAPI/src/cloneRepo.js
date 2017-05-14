const Git = require('nodegit')
const path = require('path')
const fs = require('fs')
function cloneRepo(repo, success, fail) {
    const repoPath = `${process.cwd()}/repos/${repo.name}`
    const url = repo.url
    fs.access(repoPath, (err) => {
      if (err) {
        // Not yet cloned
        Git.Clone(url, opts.path)
          .then((repository)=>{
            // We don't want to directly pass `callback` because then the consumer gets a copy
            // of the repository object, which is public API
            success && success(repository)
          })
          .catch(fail)
      } else {
        // Cloned already; we need to pull
        var repoObj;
        Git.Repository.open(repoPath).then((repository)=>{
          repoObj = repository
          return repoObj
        }).then(()=>{
          return repoObj.fetchAll()
        }).then(()=>{
          return repoObj.mergeBranches( 'master', 'origin/master')
        }).then(()=>{
          success && success(repoObj)
        }).catch(fail)
      }
    })
}
module.exports = cloneRepo