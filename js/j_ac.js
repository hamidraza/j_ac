(function($) {
  $.fn.j_ac = function() {
    var ac = {
      values:{},
      built_ul:function(jd){
        var ul = $('<ul></ul>');
        if(!jd || $.isEmptyObject(jd)){
          return ul;
        }
        var li = Array();
        $.each(jd, function(i,v){
           li.push($('<li></li>',{
            text:(v.title?v.title:'--')
          }).data(v));
        });
        li[0].addClass('selected');
        ul.append(li);
        return ul;
      },
      load_opt:function(ele, ac_box){
        var ele_p = ele.closest('.ac_p');
        $('.loader',ele_p).show(0);
        $.ajax({
          url:'data.php',
          dataType:'json',
          data:{
            data:ele.val()
          },
          success:function(d){
            ac_box.html(ac.built_ul(d));
          },
          complete:function(){
          $('.loader',ele_p).hide(0);
          }
        });
      },
      select_opt:function(selected_li,ele, ac_box){
        var ele_p = ele.closest('.ac_p');
        var ele_p_offset = ele_p.offset();
        var s_b = $('<span></span>',{
          text:selected_li.text(),
          'class':'selected_opt'
        }).data(selected_li.data());
        ele.before(s_b);
        ac_box.css({
          'min-width':ele_p.outerWidth()-2,
          'top':ele_p.outerHeight()+ele_p.offset().top-1,
          'left':ele_p.offset().left
        });
        //ac.values[ele.attr('name')][selected_li.data('id')].push(selected_li.data());
        //ac.values[ele.attr('name')]['_'+selected_li.data('id')] = 'test';
        //console.log(ac.values);
      }
    };
    $('form').live('submit', function(){
      if($('.ac_autocomplete:focus',this).length>0){
        return false;
      }
    });

    this.each(function() {
      var ele = $(this).addClass('ac_autocomplete');
      ele.wrap('<div class="ac_p" />');
      var ele_p = ele.closest('.ac_p');
      var loader = $('<div></div>',{
        class:'loader',
        html:'<span></span>'
      }).appendTo(ele_p);
      var ac_box = $('<div></div>',{
        'class':'ac_box',
        'text':'hello world'
      }).appendTo('body');
      ele.live('focus', function(e){
        ac.load_opt(ele,ac_box);
        var th_of = $(this).offset();
        var p_of = ele_p.offset();
        $('.ac_box').hide(0);
        ac_box.css({
          top:ele_p.outerHeight()+p_of.top-1,
          left:p_of.left,
          display:'block',
          'min-width':ele_p.outerWidth()-2
        });
      });
      var hover_ac_box = false;

      ac_box.on('mouseenter','ul li',function(){
        $('ul li',ac_box).removeClass('selected');
        $(this).addClass('selected');
        hover_ac_box = true;
      });
      ac_box.on('mouseleave','ul li',function(){
        hover_ac_box = false;
      });
      ele.blur(function(){
        if(!hover_ac_box){
          ac_box.hide(0);
        }
      });
      $(ac_box).on('click', 'ul li', function(){
        ac.select_opt($(this),ele, ac_box);
        //ac_box.hide(0);
        //ele.focus();
      });
      ele.live('keyup', function(e){
        console.log(e.keyCode);
        var s = $(this).val();
        var selected_li = $('ul li.selected',ac_box);
        if(!selected_li || selected_li.length==0){
          selected_li = $('ul li:first-child',ac_box);
        }
        if(e.keyCode==40){
					if(ac_box.is(':hidden')){
						ac_box.show(0);
						return false;
					}
          $('ul li',ac_box).removeClass('selected');
          if(selected_li.next('li').length>0){
            selected_li = selected_li.next('li');
          }else{
            selected_li = $('ul li:first-child',ac_box);
          }
          selected_li.addClass('selected');
        }
        if(e.keyCode==38){
					if(ac_box.is(':hidden')){
						ac_box.show(0);
						return false;
					}
          $('ul li',ac_box).removeClass('selected');
          if(selected_li.prev('li').length>0){
            selected_li = selected_li.prev('li');
          }else{
            selected_li = $('ul li:last-child',ac_box);
          }
          selected_li.addClass('selected');
        }
        if(e.keyCode>=37 && e.keyCode<=40){
          return false;
        }
        if(e.keyCode==13){
          ac.select_opt(selected_li,ele,ac_box);
          ele.val('');
          return false;
        }
				if(e.keyCode==27){
					ac_box.hide(0);
					return false;
				}
				if((e.keyCode>=48 && e.keyCode<=57) || (e.keyCode>=65 && e.keyCode<=90) || (e.keyCode>=96 && e.keyCode<=111) || (e.keyCode>=186 && e.keyCode<=192) || (e.keyCode>=219 && e.keyCode<=222)){
        	ac.load_opt($(this),ac_box);
				}
      });
      ele.live('keydown', function(e){
        if(e.keyCode==8){
          if(ele.val()==''){
            var text = ele.prev('span').text();
            var p_of = ele_p.offset();
            ele.prev('span').remove();
            ele.val(text);
            ac_box.css({
              top:ele_p.outerHeight()+p_of.top-1,
              left:p_of.left,
              display:'block',
              'min-width':ele_p.outerWidth()-2
            });
            return false;
          }
        }
      });
    });
  };
})(jQuery);