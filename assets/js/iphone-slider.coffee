setCurrentSlide = (slider, slide) ->
	inner = $(slider).find(".inner")

	slideWidth = parseInt($(slider).data 'slide-width')
	newOffset = slide * slideWidth

	inner.css 'left', -newOffset + "px"

	$(slider).data "current-slide", slide

nextSlide = () ->
	$(".slider").each () ->
		inner = $(this).find(".inner")

		slides = inner.children().length
		slideWidth = $(this).data 'slide-width'

		currentOffset = parseInt((inner.css 'left').replace(/[^-\d\.]/g, ''))
		currentSlide = $(this).data 'current-slide'

		maxOffset = (slides-1) * slideWidth

		nextSlide = 0
		if Math.abs(currentOffset) < maxOffset
			nextSlide = currentSlide + 1

		setCurrentSlide $(this), nextSlide

updateSlider = () ->
	slider = $(".slider")

	slider.each () ->
		slideWidth = parseInt(($(this).css 'width').replace(/[^-\d\.]/g, ''))
		slideHeight = parseInt(($(this).css 'height').replace(/[^-\d\.]/g, ''))

		$(this).data 'slide-width', slideWidth
		$(this).data 'slide-height', slideHeight

		setCurrentSlide(this, $(this).data("current-slide"))

$(document).ready ->
	$(window).bind 'resize', ->
		console.log "slider"
		updateSlider()

	updateSlider()
	setInterval nextSlide, 4000