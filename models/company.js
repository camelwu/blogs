const mongoose = require('./mongoose')
const CompanySchema = new mongoose.Schema({
  "name": String,
  "tel": String,
  "email": Object,
  "address": String,
  "introduction": String,
  "keywords": String,
  "description": String,
  "cover": Object,
  "createTime": {
    type: Number,
    default: +(new Date())
  },
  "updateTime": {
    type: Number,
    default: +(new Date())
  }
}, {
  collection: 'company'
})

const companyModel = mongoose.model('company', CompanySchema),
  initalC = {
    "name": '河洛文化',
    "tel": '+86 18910763350',
    "email": {
      "bp": 'bp@china.com',
      "job": 'job@china.com',
      "info": 'info1@china.com'
    },
    "address": '北京朝阳区某地',
    "introduction": '作为富有经验的财务咨询公司，河洛文化致力于客户提供一流的咨询服务。我们利用对于中国市场丰富的认知为客户解决多样的问题，帮助其在中国和国际市场中取得成功。河洛文化自2011年成立至今，已经成功帮助多家境内和境外知名公司完成交易咨询及投行服务。我们立志于给您提供最专业的服务。 团队成员均来自于法律、财务、投融资等各类专业领域内的精英 我们一直以专业，严谨，高标准要求，高效率沟通服务于客户，深受广大客户信赖 我们并不满足于目前在行业的领先地位，与处在成长发展不同阶段的客户紧密合作，为客户提供全面的高附加值，多元化的服务，并努力帮助其实现事业的成功及可持续发展。',
    "keywords": '投资,投资管理,境外融资,境外融资上市,上市方案提供商',
    "description": '作为富有经验的财务咨询公司，河洛文化致力于客户提供一流的咨询服务。我们利用对于中国市场丰富的认知为客户解决多样的问题，帮助其在中国和国际市场中取得成功。河洛文化自2011年成立至今，已经成功帮助多家境内和境外知名公司完成交易咨询及投行服务。我们立志于给您提供最专业的服务。 团队成员均来自于法律、财务、投融资等各类专业领域内的精英 我们一直以专业，严谨，高标准要求，高效率沟通服务于客户，深受广大客户信赖 我们并不满足于目前在行业的领先地位，与处在成长发展不同阶段的客户紧密合作，为客户提供全面的高附加值，多元化的服务，并努力帮助其实现事业的成功及可持续发展。',
    "cover": {}
  };

// 只有一条信息
function findMsg(option, callback) {
  companyModel.findOne(option, function (err, result) {
    if (err) return callback(err);

    callback(result)
  })
}
// 编辑保存
var saveMsg = function (params_id, user_opt, callback) {
  console.log(params_id);
  if (params_id) {console.log('upate');
    var _id = mongoose.Types.ObjectId(params_id);
    console.log('mongo=', _id)
    companyModel.updateOne({
      _id: _id
    }, user_opt, function (err, result) {
      if (err) return console.log(err);
      console.log('The raw response from Mongo was ', result);
      callback(result)
    })
  } else {console.log('add');
    companyModel.create(user_opt, function (err, result) {
      if (err) {
        return callback(err)
      }
      callback(result)
    })
  }
}

module.exports = {
  findMsg,
  saveMsg,
  initalC
}