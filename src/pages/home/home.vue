<template>
  <div>
    <h1>首页管理</h1>
    <div id="box"></div>
    
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts"
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
       reqList:"cate/reqListAction"
    })
    
  },
  watch:{
     list:{
       handler(){
         if(this.list.length>0){
         // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('box'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '首页列表图'
            },
            tooltip: {},
            legend: {
                data:['下级分类']
            },
            xAxis: {
                data:this.list.map(item=>item.catename)
            },
            yAxis: {},
            series: [{
                name: '下级分类',
                type: 'bar',
                data:this.list.map(item=>item.children.length)
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
         }
         deep:true
       }
     }
  },
  computed: {
    ...mapGetters({
      list:"cate/list"
    }),
  },
  mounted() {
     this.reqList()
  },
};
</script>
<style scoped>
#box {
  width: 80%;
  height: 500px;
  /* border: 1px solid black; */
  margin: 0 auto;
}
</style>