var express = require('express');
var app = express();

var couponData = [
  {
    id: "12345",
    details: {
      name: "Testing",
      description: "Awesome",
      expiration: "tomorrow"
    }
  },
  {
    id: "54321",
    details: {
      name: "Hello World",
      description: "Coolio",
      expiration: "today"
    }
  },
  {
    id: "1",
    details: {
      name: "One",
      description: "One is the loneliest number",
      expiration: "three weeks"
    }
  }
];

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.get('/coupons/:couponId', function(req, res){
  var data = {};
  var foundIndex = -1;

  if(req.params.couponId){
    couponData.forEach(function(item, index){
      if(item.id === req.params.couponId){
        foundIndex = index;
      }
    });
  }
  if(foundIndex >= 0){
    res.json({
      success: true,
      data: couponData[foundIndex]
    });
  } else {
    res.json({
      success: false,
      data: {}
    })
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
