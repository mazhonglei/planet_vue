    window.onload=function () {
    //    获取textarea
        var text=document.querySelector('.introduce textarea');
        text.value="星球介绍(选填)\n\n1.请简要描述提供的内容与服务\n\n2.能突出星主或嘉宾知名的身份背景介绍更好";
        var buttons =document.querySelectorAll('.selectSort button');
        console.log(buttons);
        for(var key in buttons){
            buttons[key].onclick=function(){
                for(var i=0;i<buttons.length;i++){
                    buttons[i].style.background='';
                    buttons[i].style.color=''
                }
                this.style.background='#D82105';
                this.style.color='#ffffff'
            }
        }

    }