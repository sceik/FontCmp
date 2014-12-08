/*
* File:           custom.js
* Version:        0.9
* Purpose:        custom js script
* Author:         Ciro Finizio
* Product:        Font Compare
*/

$(document).ready(function(){
	var items = [];
	var fonts = [];
	var fontAPI = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDoeSs5e1CWIX0n6zRzUnPzAudCNUX56Zc";
	var fontsJSON ;
	var color='fff';
	var colorBack='#fff';
	var bold = false;
	var obliq = false;
	var italic = false;
	var size = 13;
	var sizeT = 'px';
 	var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit rutrum tortor, non vehicula magna vestibulum non. Ut aliquet libero a auctor sagittis. Aliquam at enim vel ligula vulputate tempus non nec eros. Maecenas facilisis et mi eget consectetur. Phasellus sit amet nisl bibendum, mollis lectus at, congue erat. Aliquam dignissim diam ac est condimentum pulvinar. Suspendisse vitae libero quis neque mollis lobortis. Maecenas nec lorem et dui tincidunt commodo. Nulla egestas sagittis urna, blandit sodales nunc condimentum dapibus. Ut gravida leo mauris, vel dapibus leo euismod nec. Aenean at dignissim lorem. ";
 	

 	/*Settaggio di un testo d'esempio*/
 	$("#textarea").append(text);
 	setText($("#textarea").text());

 	/*Chiamata alle API di google per prendere la lista dei font*/
 	$.getJSON( fontAPI, {
		tagmode: "any",
		format: "json"
	})
	.done(function (data){
		fontAPI=data;
 	 	 $.each( data.items, function( key, val ) {
 	 	 	var name = val.family;
 	 	 		/*aggiunta del font alla select*/
				$("#fontSelect").append("<option>"+name+"</option>" );
		});
 	 	 /*Bind del click su un nuovo font*/
 	 	$("#fontSelect").change(function() {
 	 		console.log($(this).val());
			addTextDiv($(this).val()[0]);
		});
 	 });
	/*Prendo tutte le configurazioni salvate*/
	$.getJSON( "/takeStoredSet.php", {
		tagmode: "any",
		format: "json"
	})
	.done(function (data){
 	 		$.each( data, function(key,val){
 	 			$("#ulConf").append("<li><a class='listConf'>"+val+"<a></li>");
 	 		});
 	 		$(".listConf").click(function(event) {
 	 			chargeSet($(this).text());
 	 		});
 	 });

	/*Caricamento di una configuarazione dal server*/
	function chargeSet(name){
		$.post( "/takeSet.php", {config:name})
		.done(function (data){
				var config = $.parseJSON(data);
	 	 		$(".containerFonts").empty();
	 	 		color = config.color;
	 	 		bold = config.bold;
	 	 		italic = config.italic;
	 	 		obliq = config.obliq;
	 	 		colorBack = config.background;
	 	 		size=config.size;
	 	 		sizeT=config.sizeT;
	 	 		$('#size').val(size);
	 	 		$('#sizeT').val(sizeT);
	 	 		$('#bold').val(bold);
	 	 		/*insert tab fonts*/
	 	 		$.each( config.fonts, function(key,val){
	 	 			addTextDiv(val);
	 	 		});
	 	 });
	}
	/*modifica del testo ti tutte le tab*/
 	function setText(text){
 		for (var i = 0; i < fonts.length ; i++) {
			var fontNameN = fonts[i].replace(/\s/g,"_");
 			$("#"+fontNameN+" p").text(text);
 		}
 	}
 	/*aggiunta di un nuovo font div*/
	function addTextDiv(fontName){
		
		var fontNameN = fontName.replace(/\s/g,"_");
		$("head").prepend("<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family="+fontName+"'>");
		if((fonts.length%3) === 0)
				$(".containerFonts").append("<div class='row'></div>");
		
		$(".containerFonts>div:last-child").append("<div class='col-md-4 col-xs-12 col-sm-6 panel panel-default' id='"+fontName+"'_div'>"+
							"<div class='panel-heading'>"+fontName+"</div>"+
								"<div class='panel-body'>"+
									"<p>"+text+"</p>"+
								" </div>"+
							"</div>");

		$("#"+fontNameN+" p").css({ 
					'font-family' : fontName.valueOf()
				});
		fonts.push(fontName);
		setColor();
		setBackgroundColor();
		setSize();
		setBold();
		setObliq();
		setItalic();
	}

	/*colorpicker bind*/
	$('#picker').colpick({
					layout:'hex',
					submit:0,
					onChange:function(hsb,hex,rgb,el,bySetColor) {
						color= "#"+hex;
						$(".containerFonts").css({
							color: color
						});
					}
				});
	/*colorpicker for background bind*/
	$('#pickerBack').colpick({
					layout:'hex',
					submit:0,
					onChange:function(hsb,hex,rgb,el,bySetColor) {
						colorBack= "#"+hex;
						$(".containerFonts .panel-body").css({
							backgroundColor: colorBack
						});
					}
				});
	$('#change').click(function(event) {
		console.log()
	});
	/*bind enter on textarea*/
	$("textarea").keyup(function(e){
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13) 
			setText($(this).val());
	});

	$('#textarea').change(function(){
		setText($(this).val());
	});
	$('#normal').change(function(){
		if($(this).is(":checked")) 
			$(".containerFonts").addClass('normal');
		else 
			$(".containerFonts").removeClass('normal');
	});
	/*Funzioni per settare le varie inpostazioni*/
	function setColor(){
		$(".containerFonts").css({
							color: color
					});
		}
	function setBackgroundColor(){
	$(".containerFonts .panel-body").css({
				backgroundColor: colorBack
			});
	}
	function setItalic(){
		if(italic) 
			$(".containerFonts").addClass('italic');
		else 
			$(".containerFonts").removeClass('italic');
	}
	function setBold(){
		if(bold) 
			$(".containerFonts").addClass('bold');
		else 
			$(".containerFonts").removeClass('bold');
	}
	function setObliq(){
		if(obliq) 
			$(".containerFonts").addClass('oblic');
		else 
			$(".containerFonts").removeClass('oblic');
	}
	function setSize(){
		$(".containerFonts p").css({
			'fontSize': size+sizeT
		});
	}
	/*Bind onChange sulle varie opzioni*/
	$('#italic').change(function(){
		italic=$(this).is(":checked");
		setItalic();
	});

	$('#bold').change(function(){
		bold=$(this).is(":checked");
		setBold();
	});

	$('#oblic').change(function(){
		obliq=$(this).is(":checked");
		setObliq();
	});

	$('#underline').change(function(){
		if($(this).is(":checked")) 
			$(".containerFonts").addClass('unerline');
		else 
			$(".containerFonts").removeClass('underline');
	});

	$('#size').change(function(){
		size = $(this).val();
		setSize();
	});

	$('#sizeT').change(function(){
		sizeT = $(this).val();
		setSize();
	});

	/*modal show e salvataggio sul server*/
	$('#myModal').on('show.bs.modal', function (event) {
		$('#saveConfig').one('click',function(){
			var insertedName = $("#configName").val();
			$.ajax({
					url: 'storeFontsSet.php',
					type: 'POST',
					data: { json: {
							name: insertedName,
							color: color,
							background: colorBack,
							fonts:fonts,
							size: size,
							sizeT: sizeT,
							bold: bold,
							obliq: obliq,
							italic: italic
					}},
					dataType: 'json'
			});
			$("#myModal").modal('hide');
		});
	});
});

