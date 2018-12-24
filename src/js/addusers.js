(()=>{

    var urlname = location.search.slice(1);
    
    name = urlname.split('=')[1];
    console.log(name)
    if(name != 'undefined'){
        
    
        $.ajax({
            type:'get',
            url:'/html/adduser',
            data:{
                name
            },
            success:(data)=>{
                
                var res = data.data[0];
                console.log(res);
                $('.uname').val(res.username);
                $('.psws').val(res.password);
                $('.uphone').val(res.uphone);
                $('.usex').val(res.usex);
                $('.ue-mail').val(res.uemail);
                $('.utext').val(res.utext);
            }
    
        });
    }
    
})()