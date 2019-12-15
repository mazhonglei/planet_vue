        $(function () {
            $('.time .circle .imgs').hide();
            $('.time').click(function(){
                // $('.header span').css('color','#D82105');
                $(this).css('border','solid 1px #D82105').siblings().css('border','');
                $(this).find('.circle .imgs').show();
                $(this).find('.circle').css('border','0');
                $(this).siblings().find(".circle .imgs").hide();
                $(this).siblings().find(".circle").css("border","1px solid #A9A9A9");

            })
        })
