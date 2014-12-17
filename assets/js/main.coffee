getStats = () ->
	url = "http://devapi.bemyeyes.org/stats/community?callback=?"
	xhr = $.getJSON url, () ->
		console.log "Got api response"

	xhr.done (json) ->
		console.log json
		console.log json.no_helped
		applyStats json.blind, json.helpers, json.no_helped

	xhr.fail () ->
		console.log "failed to get api stats"

applyStats = (blind, helpers, helped) ->
	offset = 400
	countTotStat "stats_helpers", helpers
	delay offset, ->
		countTotStat "stats_blind", blind
		delay offset, ->
			countTotStat "stats_helped", helped

countTotStat = (elem, stat) ->
	anim = new countUp(elem, 0, stat, 0, 2.0)
	anim.start()

delay = (ms, func) ->
	setTimeout func, ms

animateFeatures = ->
	$(".features .feature").each ->
		$obj = $(this)

		return if $obj.hasClass 'animated'

		windowHeight = $(window).height()
		windowOffset = $(window).scrollTop()
		offset = $obj.offset().top

		if offset < (windowOffset + windowHeight)
			scrolled = Math.round(((windowOffset + windowHeight - offset) / windowHeight ) * 100)
			if scrolled > 10
				$obj.addClass 'animated'
				$obj.transition {scale: 1.2}, 400
				$obj.transition {scale: 1.0}, 200

$(window).scroll ->
	$this = $(this)
	$header = $(".menu-container")
	if $this.scrollTop() > 1
		$header.addClass "sticky"
	else
		$header.removeClass "sticky"

	animateFeatures()

$(document).ready ->
	getStats()