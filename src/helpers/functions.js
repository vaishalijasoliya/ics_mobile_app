import moment from 'moment';
export const upperCase = (value) => {
    var res = value.toUpperCase();
    return res;
};
export const dateMonthOfTimestamp = (value) => {
    var arr = value.split("-");
    var date = parseInt(arr[2], 10);
    var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    var month_index = parseInt(arr[1], 10) - 1;
    return date + ' ' + months[month_index];
};
function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hr = d.getHours(),
      min = d.getMinutes(),
      sec = d.getSeconds();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    if (hr < 10)
      hr = "0" + hr;
    if (min < 10)
      min = "0" + min;
    if (sec < 10)
      sec = "0" + sec;
    // 2020-10-09 04:27:00
    return year + '-' + month + '-' + day + ' ' + hr + ':' + min;
}

export const formatDateHour = (date) => {
  console.log('FORMATEDATEHOUR>> ',date)
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hr = d.getHours(),
    min = d.getMinutes(),
    sec = d.getSeconds();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  if (hr < 10)
    hr = "0" + hr;
  if (min < 10)
    min = "0" + min;
  if (sec < 10)
    sec = "0" + sec;
  // 2020-10-09 04:27:00
  return year + '-' + month + '-' + day + ' ' + hr + ':' + min;
}

export const calculateDuration = (start_date, flow_rate, duration) => {
  const durationResponse = { endtime : "", volume : "",};
  var sFormat = moment(start_date, 'DD/MM/YYYY HH:mm')
    var test=duration.split(':');
    var datetime=new Date(sFormat);
    duration=parseInt(test[0]);
    datetime.setHours(datetime.getHours()+duration)
    var volume=(flow_rate/24)*duration;
    if(isNaN(datetime)){
      return false
    }
    if(isNaN(datetime && volume)){
      console.log('IF END DATE : ', datetime)
      console.log('IF VOLUME : ', volume)
      return false
    }
    else{
      durationResponse.endtime = moment(datetime).format('YYYY-MM-DD HH:mm');
      durationResponse.volume = volume.toFixed(2);
      return durationResponse
    }
}



export const calculateEndDate = (start_date, flow_rate, end_date) => {
  const endTimeResponse = { duration : "", volume : "",};
  // RETURNS VOLUME AND DURATION
  console.log("START DATE STRING 1.1 : ", start_date + typeof start_date)
  console.log("END DATE STRING 2.1 : ", start_date + typeof end_date)
  // console.log("START DATE STRING 1.2 : ", start_date.getTime())
  var sFormat = moment(start_date, 'DD/MM/YYYY HH:mm')
  var eFormat = moment(end_date, 'DD/MM/YYYY HH:mm')
  var sd = new Date(sFormat).getTime()/1000;
  var ed = new Date(eFormat).getTime()/1000;
  console.log("START DATE STRING 1.2 : ", sd)
  console.log("END DATE STRING 2.2 : ", ed)
  var timeDiff = (ed - sd)/3600;
  timeDiff= timeDiff.toString().split(".")[0];
  console.log('timeDiff : ',timeDiff)
  var volume=(flow_rate/24)*timeDiff
  console.log('Volume : ',volume)
  if(timeDiff==0 && volume==0){
    console.log('IF DURATION : ', timeDiff)
    console.log('IF VOLUME : ', volume)
    return false
  }
  if(isNaN(timeDiff && volume)){
    return false
  }
  else{
    endTimeResponse.duration = timeDiff;
    endTimeResponse.volume = volume.toFixed(2);
    return endTimeResponse;
  }

};


export const calculateVolume = (start_date, flow_rate, volume) => {
  const response = { duration : "", endtime : "" };
  var duration = volume * (24 / flow_rate)
  duration = deciHours(duration)
  var sFormat = moment(start_date, 'DD/MM/YYYY HH:mm')
  var datetime = new Date(sFormat);   
  console.log('DateTime>> ',datetime) 
  datetime.setHours(datetime.getHours() + duration)
  if(isNaN(datetime)){
    return false
  }
  if(duration == 0){
    return false
  }
  if(isNaN(duration && datetime)){
    console.log('IF DURATION : ', duration)
    console.log('IF END DATE : ', datetime)
    return false
  }
  else{
    response.duration = duration;
    response.endtime = moment(datetime).format('YYYY-MM-DD HH:mm');
    return response;
  }
}
function deciHours(time) {
    return (function (i) {
        return i + (Math.round(((time - i) * 60), 10) / 100);
    })(parseInt(time, 10));
}