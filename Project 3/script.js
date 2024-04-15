const clock = document.getElementById('clock');
//const clock = document.querySelector('#clock')

setInterval(function () {    //for this method the time will show every 1sec
    let date = new Date();
    //console.log(date.toLocaleTimeString()) this method used to disply time
    clock.innerHTML = date.toLocaleTimeString();
  }, 1000);

  

 