//custom select

function create_custom_dropdowns() {
    $('select').each(function(i, select) {
        if (!$(this).next().hasClass('dropdown')) {
            $(this).after('<div class="dropdown ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>');
            var dropdown = $(this).next();
            var options = $(select).find('option');
            var selected = $(this).find('option:selected');
            dropdown.find('.current').html(selected.data('display-text') || selected.text());
            options.each(function(j, o) {
                var display = $(o).data('display-text') || '';
                dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
            });
        }
    });
}

// Event listeners

// Open/close
$(document).on('click', '.dropdown', function(event) {
    $('.dropdown').not($(this)).removeClass('open');
    $(this).toggleClass('open');
    if ($(this).hasClass('open')) {
        $(this).find('.option').attr('tabindex', 0);
        $(this).find('.selected').focus();
    } else {
        $(this).find('.option').removeAttr('tabindex');
        $(this).focus();
    }
});
// Close when clicking outside
$(document).on('click', function(event) {
    if ($(event.target).closest('.dropdown').length === 0) {
        $('.dropdown').removeClass('open');
        $('.dropdown .option').removeAttr('tabindex');
    }
    event.stopPropagation();
});
// Option click
$(document).on('click', '.dropdown .option', function(event) {
    $(this).closest('.list').find('.selected').removeClass('selected');
    $(this).addClass('selected');
    var text = $(this).data('display-text') || $(this).text();
    $(this).closest('.dropdown').find('.current').text(text);
    $(this).closest('.dropdown').prev('select').val($(this).data('value')).trigger('change');
});

// Keyboard events
$(document).on('keydown', '.dropdown', function(event) {
    var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
    // Space or Enter
    if (event.keyCode == 32 || event.keyCode == 13) {
        if ($(this).hasClass('open')) {
            focused_option.trigger('click');
        } else {
            $(this).trigger('click');
        }
        return false;
        // Down
    } else if (event.keyCode == 40) {
        if (!$(this).hasClass('open')) {
            $(this).trigger('click');
        } else {
            focused_option.next().focus();
        }
        return false;
        // Up
    } else if (event.keyCode == 38) {
        if (!$(this).hasClass('open')) {
            $(this).trigger('click');
        } else {
            var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
            focused_option.prev().focus();
        }
        return false;
        // Esc
    } else if (event.keyCode == 27) {
        if ($(this).hasClass('open')) {
            $(this).trigger('click');
        }
        return false;
    }
});

$(document).ready(function() {
    create_custom_dropdowns();
});







//custom range
function init() {
    var sliders = document.getElementsByClassName("tick-slider-input");
    for (var i=0;i<sliders.length;i++) {
        var slider = sliders[0];
        slider.oninput = onSliderInput;
        updateProgress(slider);
        setTicks(slider);
    }
}

function onSliderInput(event) {
    updateProgress(event.target);
}

function updateProgress(slider) {
    var progress = document.getElementById("weightProgress");
    var percent = getSliderPercent(slider);

    progress.style.width = percent * 100 + "%";
}

function getSliderPercent(slider) {
    var range = slider.max - slider.min;
    var absValue = slider.value - slider.min;

    return absValue / range;
}

window.addEventListener('resize', setTicks);


function setTicks(slider) {
    const positions = ["Не владею", "Использую готовыерешения", "Использую&nbsp;готовые&nbsp;решения и&nbsp;умею&nbsp;&nbsp;переделывать", "Пишу сложный JS с нуля"];
    const positions1 = ["0%","25%","75%","100%"];
    var container = document.getElementById("weightTicks");
    container.innerHTML = '';
    var spacing = parseInt(slider.step);
    var sliderRange = slider.max - slider.min;
    var tickCount = sliderRange / spacing + 1; // +1 to account for 0


    var tickValue = parseInt(slider.min);

    if($(window).width() < 768)  {
        for (const pos of positions1) {
            var tick = document.createElement("div");
            tick.className = "tick-slider-tick";
            var tickValueElem = document.createElement("div");
            tickValueElem.className = "tick-value";
            tickValueElem.innerHTML = pos;
            tick.appendChild(tickValueElem);
            container.appendChild(tick);
            tickValue += spacing;
        }
    }
    else{
        for (const pos of positions) {
            var tick = document.createElement("div");
            tick.className = "tick-slider-tick";
            var tickValueElem = document.createElement("div");
            tickValueElem.className = "tick-value";
            tickValueElem.innerHTML = pos;
            tick.appendChild(tickValueElem);
            container.appendChild(tick);
            tickValue += spacing;
        }
    }



}

window.onload = init;

$('.menu-icon').click(function(){
    $(this).toggleClass('clicked');
    $('.mobile-menu').toggleClass('active-menu');
});


$(document).ready(function() {
    let userinput = document.querySelectorAll('.userInput');
    let inputBox = document.querySelectorAll('.inputBox');
    console.log(userinput);
    console.log(userinput[0].value);
    for (let i = 0; i < userinput.length; i++){
        inputBox[i].classList.add('focus');
    }
});


$(".userInput").focus(function () {
    $(this).parent().addClass("focus");


}).blur(function () {
    if ($(this).val() === '') {
        $(this).parent().removeClass("focus");
    }
})