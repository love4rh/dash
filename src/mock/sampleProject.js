export const scriptSample = {
  "title":"Sample Project",
  "description":"project is blah~ blah~",
  "author":"mh9.kim@lge.com",
  "nodes":{
    "j6oV0Da3":{
      "id":"j6oV0Da3",
      "name":"SCHEDULE",
      "type":"com.lge.crawlego.project.DataFetchMethod",
      "x":134,
      "y":233
    },
    "Z7sgOqW5":{
      "id":"Z7sgOqW5",
      "name":"SCHEDULELIST",
      "type":"com.lge.crawlego.project.DataGroup",
      "x":234,
      "y":233
    },
    "vdYL7HA8":{
      "id":"vdYL7HA8",
      "name":"PROGRAM",
      "type":"com.lge.crawlego.project.DataFetchMethod",
      "x":131,
      "y":113
    },
    "qhBHQqiX":{
      "id":"qhBHQqiX",
      "name":"PROGRAMLIST",
      "type":"com.lge.crawlego.project.DataGroup",
      "x":231,
      "y":113
    },
    "gZcqmSnM":{
      "id":"gZcqmSnM",
      "name":"CHANNEL",
      "type":"com.lge.crawlego.project.DistinctDataInfo",
      "x":413,
      "y":234
    },
    "Xopizti8":{
      "id":"Xopizti8",
      "name":"PGM_SCH_CHECK",
      "type":"com.lge.crawlego.project.MergeDataInfo",
      "x":371,
      "y":97
    }
  },
  "links":[
    {
      "begin":"j6oV0Da3",
      "end":"Z7sgOqW5",
      "type":"normal",
      "text":""
    },
    {
      "begin":"vdYL7HA8",
      "end":"qhBHQqiX",
      "type":"normal",
      "text":""
    },
    {
      "begin":"Z7sgOqW5",
      "end":"gZcqmSnM",
      "type":"normal",
      "text":""
    },
    {
      "begin":"Z7sgOqW5",
      "end":"Xopizti8",
      "type":"normal",
      "text":""
    },
    {
      "begin":"qhBHQqiX",
      "end":"Xopizti8",
      "type":"normal",
      "text":""
    }
  ]
};
