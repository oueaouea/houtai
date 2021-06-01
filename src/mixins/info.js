export let infoMange = {
    data() {
        return {
            info: {
                //控制表单是否显示
                isshow: false,
                //是不是添加
                isadd: false,
            },
        }
    },
    methods: {
        //点击添加显示表单
        show() {
            this.info.isadd = true;
            this.info.isshow = true;
        },
        //修改
        willchange(id) {
            this.info.isshow = true;
            this.info.isadd = false;
            console.log(id);
            //通知form取数据？？？？
            // console.log(this.$refs);
            // console.log(this.$refs.form)
            //不懂原理
            this.$nextTick(() => {
                this.$refs.form.getOne(id);
            });
        },
    }
}