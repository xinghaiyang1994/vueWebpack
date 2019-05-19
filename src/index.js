import './style/base.css'
import './style/style.scss'


async function a () {
  await new Promise(function (resolve, reject) {
    resolve(1)
  })
  console.log(22)
  return 122
}

a().then(res => {

  console.log(res)
})
console.log(1)