module.exports={
    insert(collectionName,insertData){
        return new Promise((resolve,reject)=>{
            collectionName.insertMany(insertData,(err)=>{
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        })
        
    },
    delete(collectionName,whereData,deleteNum){
        return new Promise((resolve,reject)=>{
            const deleteType=deleteNum===1?'deleteMany':'deleteOne'
            collectionName[deleteType](whereData,(err)=>{
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        })
    },
    update(collectionName,whereData,updateData,updateNum){
        return new Promise((resolve,reject)=>{
            const updateType=updateNum===1?'updateMany':'updateOne'
            collectionName[updateType](whereData,updateData,(err)=>{
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        })
    },
    find(collectionName,whereData,showData){
        return new Promise((resolve,reject)=>{
            collectionName.find(whereData,showData,(err,data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    paging(collectionName,whereData,showData,limitnum,count){
        return new Promise((resolve,reject)=>{
            collectionName.find(whereData,showData).limit(limitnum).skip(count*limitnum).exec((err,data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    sort(collectionName,whereData,showData,sortData){
        return new Promise((resolve,reject)=>{
            collectionName.find(whereData,showData).sort(sortData).exec((err,data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    count (collectionName) {
        return new Promise((resolve, reject) => {
          return collectionName.count((err, len) => {
            if (err) throw err
            resolve(len)
          })
        })
        
      }
}