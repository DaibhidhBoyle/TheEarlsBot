const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

function getSuffix(day) {
  lastdigit = day.toString().split('').pop();
  lastdigitasnumber = Number(lastdigit)
  if (day === 11 || day === 12 || day === 13){
    return 'th'
  }
  else {
    switch (lastdigitasnumber) {
      case 1:
      return 'st'
      case 2:
      return 'nd'
      case 3:
      return 'rd'
      default:
      return 'th'
    }
  }
}


  module.exports.format = async function (date) {
    let month = monthNames[date.getMonth()]
    let suffix = await getSuffix(date.getDate());

    return `${date.getDate()}` + `${suffix}` + ' ' + `${month}` + ' ' + `${date.getFullYear()}`
  };
