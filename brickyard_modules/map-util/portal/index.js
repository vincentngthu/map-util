const _ = require('lodash')
const $ = require('jquery')
require('bootstrap')
require('bootstrap/dist/css/bootstrap.css')
require('./main.css')

const html = require('html-loader!./index.html')
const loader = require('./loader')
const file = require('./file')
const mapManager = require('./map')


$(async () => {
	const app = $('#brickyard-app')
	app.html(html)
	await mapManager.init('mapComponent')
	loader.init('loaderComponent')

	file.init('fileComponent')
	file.onRead = (sheets) => {
		const list = _.concat(..._.values(sheets))
		mapManager.resetSidebar()
		mapManager.setRenderList(list)
		$('#getGeoLocations').off('click').click(async () => {
			mapManager.fetchGeoLocations()
		})
		$('#exportFile').off('click').click(() => {
			file.exportFile(list, `locations${Date.now()}`)
		})
		$('#operations').show()
	}
})
