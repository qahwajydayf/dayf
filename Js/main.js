document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelectorAll(".fade-in"),t=new IntersectionObserver((e,t)=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add("visible"),t.unobserve(e.target))})},{threshold:.1});e.forEach(e=>t.observe(e))}),document.querySelectorAll("img").forEach(e=>{e.setAttribute("loading","lazy")});const bookingForm=document.getElementById("bookingForm");bookingForm&&bookingForm.addEventListener("submit",function(e){e.preventDefault();let t=`
🌟 طلب حجز خدمة ضيافة تراثية جديد:

👤 الاسم: ${this.elements[0].value}
📱 الهاتف: ${this.elements[1].value}
🎉 نوع المناسبة: ${this.elements[2].value}
📅 التاريخ: ${this.elements[3].value}
👥 عدد الضيوف: ${this.elements[4].value}
📍 المنطقة: ${this.elements[5].value}
📝 تفاصيل إضافية: ${this.elements[6].value||"لا توجد"}

شكرًا لثقتكم بفريق الضيافة التراثية!
        `.trim(),l=`https://wa.me/966507712688?text=${encodeURIComponent(t)}`;window.open(l,"_blank"),this.reset()}),document.addEventListener("keydown",e=>{if("Escape"===e.key){let t=document.querySelector(".fixed.inset-0.bg-black");t&&t.click()}});
