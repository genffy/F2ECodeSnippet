import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import jsonData from '../data.json'
export default class Index extends Component {
    constructor(props){
        super(props)
        console.log(jsonData)
    }
    render() {
        return (
            <div>
                {
                  jsonData.map((project, pi)=>{
                    const {apis, name, meta, params} = project
                    if(apis.length== 0){
                      return (
                        <div key={pi}>
                          <h2>项目名称：{name}</h2>
                          <p>暂未使用到jsBrige</p>
                        </div>
                      )
                    }
                    return (
                      <div key={pi}>
                        <h2>项目名称：{name}，更新日期：{meta.last_activity_at}</h2>
                        <p>使用版本：{params.type + '：' + params.name + '@' + params.version}</p>
                        <p>JSBrige API列表：</p>
                        <dl>
                          {
                            apis.map((api, ai)=>{
                              return Object.keys(api).map((key, ki)=>{
                                const arr = [<dt>{key}</dt>]
                                Object.keys(api[key]).map((val, vi)=>{
                                  arr.push(<dd>api名称：{val}, 使用次数：{api[key][val]}</dd>)
                                })
                                return arr
                              })
                            })
                          }
                        </dl>
                      </div>
                    )
                  })
                }
            </div>
        )
    }
}