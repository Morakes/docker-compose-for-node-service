const path = require("path")
const fs = require("fs")
let { promisify } = require("util")

const uploadFile = function (ctx) {
	return new Promise(async (res, rej) => {
		try {
			const name = ctx.request.body.name || ctx.request.files.file.name
			const file = ctx.request.files.file // 获取上传文件
			const dir = await checkDir(file, name).catch(err => {
				rej({ code: -1, msg: err })
			})
			const reader = fs.createReadStream(file.path) // 创建可读流
			const upStream = fs.createWriteStream(dir.filePath)
			reader.pipe(upStream)
			res({
				url: dir.url,
				path: dir.filePath,
				dirPath: dir.dirPath,
				urlPath: dir.urlPath,
				suffix: getSuffix(file.name),
				name: dir.fileName,
				pureName: name,
				size: (file.size / 1024 / 1024).toFixed(2),
			})
		} catch (err) {
			rej(err)
		}
	})
}
const checkDir = async function (file, name) {
	const date = `${new Date().getFullYear()}-${
		new Date().getMonth() + 1
	}-${new Date().getDate()}`
	// 生成YYYY-MM-DD字符串

	// 文件名称
	const fileName = new Date().getTime() + "." + getSuffix(name)
	// 文件夹路径
	const dirPath = path.join(__dirname, `../../public/img/${date}/`)
	// 文件实际路径
	const filePath = path.join(__dirname, `../../public/img/${date}/${fileName}`)
	// 文件访问路径
	const urlPath = `${config.baseUrl}/img/${date}/`
	// 文件访问路径
	const url = `${urlPath}/${fileName}`

	const exist = promisify(fs.stat)
	const result = await exist(dirPath).catch(err => {
		fs.mkdirSync(dirPath)
	})
	return { filePath, urlPath, url, fileName, dirPath }
}

const getSuffix = function (filename) {
	var index = filename.lastIndexOf(".")
	if (index == -1) {
		return ""
	}
	var length = filename.length
	var suffix = filename.substring(index + 1, length)
	return suffix
}
module.exports = uploadFile
