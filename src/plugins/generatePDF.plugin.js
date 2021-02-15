import jsPDF from 'jspdf'
export default{
    install(Vue, options){
        Vue.prototype.$getCheck = function(DATA){
            if(typeof DATA === 'object' && DATA != null){
                CREATE_PDF(DATA)
            }else{
                console.error("Error! '$getCheck(DATA)' cannot be empty or undefined")
            }
        }
        const Option={
            text_size : 14
        }
        function getDate(date){
            let option={}
            option.day = '2-digit'
            option.month = 'numeric'
            option.year = 'numeric'
            return new Intl.DateTimeFormat('ru-RU', option).format(new Date(date))
        }
        function SetSize(text){
            if(text.lenght > 50) return 9
            if(text.lenght >10) return 4
        }
        function CREATE_PDF (DATA) {
            let pdfName = 'check_'+DATA.order_number; 
            var doc = new jsPDF();
            
            doc.setFont("helvetica", "bold");
            //Text Center
            doc.text("Check", 105, 20, null, null, "center");

            //Text Right
            doc.setFont("courier", "normal");
            doc.text(`${getDate(DATA.date_order)}`, 155, 30, null, null, "right");
            //Text Left
            doc.text(`${DATA.order_number}`, 20, 30, null, null, "left");
            
            //Line
            doc.setLineDash([0]);
            doc.setLineWidth(0.5);
            doc.line(0, 33, 300, 33);

            doc.setFontSize(Option.text_size);
            doc.text("Company:", 10, 39, null, null, "left");
            doc.setFontSize(Option.text_size);
            doc.text(`${DATA.company}`, 40, 39, null, null, "left");
            doc.setLineDash([0.5]);
            doc.line(10, 42, 200, 42);

            doc.text("Goods:", 10, 48, null, null, "left");
            doc.setFontSize(DATA.goods.lenght > 50 ? 8 : DATA.goods.lenght >100 ? 4 : Option.text_size);
            doc.text(`${DATA.goods}`, 40, 48, null, null, "left");
            doc.setLineDash([0.5]);
            doc.line(10, 51, 200, 51);

            doc.text("BIO:", 10, 57, null, null, "left");
            doc.setFontSize(Option.text_size);
            doc.text(`${DATA.bio}`, 40, 57, null, null, "left");
            doc.setLineDash([0.5]);
            doc.line(10, 60, 200, 60);

            doc.text("Email:", 10, 66, null, null, "left");
            doc.setFontSize(Option.text_size);
            doc.text(`${DATA.email}`, 40, 66, null, null, "left");
            doc.setLineDash([0.5]);
            doc.line(10, 69, 200, 69);

            doc.text("Phone:", 10, 75, null, null, "left");
            doc.setFontSize(Option.text_size);
            doc.text(`${DATA.phone}`, 40, 75, null, null, "left");
            doc.setLineDash([0.5]);
            doc.line(10, 78, 200, 78);

            doc.text("Address:", 10, 84, null, null, "left");
            doc.setFontSize(Option.text_size);
            doc.text(`${DATA.address}`, 40, 84, null, null, "left");
            doc.setLineDash([0.5]);
            doc.line(10, 87, 200, 87);

            doc.text("Payment:", 10, 93, null, null, "left");
            doc.setFontSize(Option.text_size);
            doc.text(`${DATA.payment}`, 40, 93, null, null, "left");
            doc.setLineDash([0]);
            doc.setLineWidth(0.5);
            doc.line(0, 96, 300, 96);
            
            doc.text(`Shipping: $${DATA.shipping}`, 20, 115, null, null, "left");
            doc.text(`Goods: $${DATA.goods_price}`, 20, 125, null, null, "left");

            doc.text(`Tax: $${DATA.tax}`, 180, 115, null, null, "right");
            doc.text(`Gift: -$${DATA.gift}`, 180, 125, null, null, "right");

            doc.setFont("helvetica", "bold");
            //Text Center
            doc.text(`TOTAL: $${DATA.total}`, 105, 140, null, null, "center");
            


            
            doc.save(pdfName + '.pdf');
        }
    }
}