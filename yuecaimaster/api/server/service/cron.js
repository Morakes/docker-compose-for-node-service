const cronJob = require("cron").CronJob
const cron = new cronJob(
	"0 0 3 * * *",
	() => {
		rmBin()
	},
	null,
	false,
	"Asia/Chongqing"
)
async function rmBin() {
	const fileModel = require("../model/File")
	const fs = require("fs")
	const path = require("path")
	// 获取当前静态文件夹下所有文件夹
	const realFiles = fs.readdirSync(path.join(__dirname + "../../../public/"))
	// 排除api文档文件夹
	realFiles.splice(realFiles.indexOf("doc"), 1)
	// 获取文件夹内所有文件
	var realFileArr = []
	for (let item of realFiles) {
		var temp = fs.readdirSync(path.join(__dirname + "../../../public/" + item))
		temp = temp.map(name => {
			let path = "/" + item + "/" + name
			return path
		})
		realFileArr.push(temp)
	}

	realFileArr = realFileArr.join().split(",")

	const [err, files] = await to(fileModel.findAll())
	if (err) {
		console.log(err)
	}

	const fileArr = files.map(item => {
		return item.url.slice(item.url.indexOf("/", config.baseUrl.length))
	})
	for (let item of realFileArr) {
		const index = fileArr.indexOf(item)
		if (index === -1) {
			const filePath = path.join(__dirname + "../../../public/" + item)
			const exist = fs.statSync(filePath)
			if (exist.isFile()) {
				const res = fs.unlinkSync(filePath)
			}
		}
	}
}

module.exports = cron
