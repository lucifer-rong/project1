class List3{
    constructor(){
        this.cont = document.querySelector(".cont3");
        this.url = "http://localhost/xiangmu/project/data/goods2.json";

        this.init();
        
    }
    init(){
        var that = this;
        ajax({
            url:this.url,
            success:function(res){
                that.res = JSON.parse(res)
                that.display()
            }
        })
    }
    display(){
        var str = "";
        for(var i=0;i<this.res.length;i++){
            str += `<li index="${this.res[i].goodsId}">
                        <img src="${this.res[i].src}">
                        <p>${this.res[i].name}</p>
                        
                        <span>￥${this.res[i].price}</span>
                        <em class="btn">加入购物车</em>
                    </li>`
        }
        this.cont.innerHTML = str;
    }
    
}

new List3;