var vcard= {
    str_vcard:'BEGIN:VCARD\nVERSION:3.0\n',
    str_end:'\nEND:VCARD',
    goog_chart:'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=',
    build_name: function(){
        var first_name = $('input[name="first_name"]').val(),
            last_name = $('input[name="last_name"]').val();
        
        vcard.str_vcard += 'N:'+last_name+';'+first_name+'\n'+
                            'FN:'+first_name+' '+last_name;
    },
    build_address: function(){
        var home_street = $('input[name="home_street"]').val(),
            home_city = $('input[name="home_city"]').val(),
            home_region = $('input[name="home_region"]').val(),
            home_post = $('input[name="home_post"]').val(),
            home_country = $('input[name="home_country"]').val(),
            org_street = $('input[name="org_street"]').val(),
            org_city = $('input[name="org_city"]').val(),
            org_region = $('input[name="org_region"]').val(),
            org_post = $('input[name="org_post"]').val(),
            org_country = $('input[name="org_country"]').val();
        
        vcard.str_vcard += '\nADR;TYPE=home:;;'+home_street+';'+home_city+';'+home_region+
                            ';'+home_post+';'+home_country+
                            '\nADR;TYPE=work:;;'+org_street+';'+org_city+';'+org_region+
                            ';'+org_post+';'+org_country;
      },      
    save: function(){
        vcard.build_name();
        
        vcard.build_address();
        
        vcard.str_vcard += vcard.str_end;
        ,
        $('textarea[name="vcard"]').val(vcard.str_vcard);
     
        $('#qr').attr('src',vcard.goog_chart+vcard.str_vcard);
    }
}

$(function(){
    $('input[name="submit"]').click(vcard.save);
});
