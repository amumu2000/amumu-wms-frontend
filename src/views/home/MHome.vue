<script setup>
const p = [
    {
        title: "产品概述",
        text: "企业的仓储管理，是对仓库及仓库内的物资所进行的管理，是企业为了充分利用所具有的仓储资源提供高效的仓储服务所进行的计划、组织、控制和协调过程。它作为连接生产者和消费者的纽带，在整个物流和经济活动中起着至关重要的作用。\n" +
            "简单、静态的传统仓储管理模式普遍存的物资库存量巨大、物资跟踪困难、资金和物资周转效率较低、人力成本偏高、物流管理的信息和手段落后等缺点，已不能适应新的仓储管理需求。各大企业正在通过破除传统的仓储管理模式，积极探讨新的信息管理技术，在适应企业原有管理流程的基础上，构建新的仓储管理信息化系统平台，协调各个环节的运作，保证及时准确的进出库作业和实时透明的库存控制作业，合理配置仓库资源、优化仓库布局和提高仓库的作业水平，提高仓储服务质量、节省劳动力和库存空间，降低运营成本，从而增强企业市场竞争力。"
    },
    {
        title: "智能仓储的优势",
        text: "节省劳动力，节约占地；在相同面积的土地上，建设智能化仓库达到的存储能力比建设普通仓库高出几倍甚至十几倍。\n" +
            "智能化仓库出入库作业迅速、准确、有效缩短作业时间，同时作业准确率得到提高，仓库与供货单位、用户能够有机地协调，有利于缩短货物流通时间。\n" +
            "智能化仓库有利于商品的保管，在自动化仓库中，可存放的商品多、数量大，品种多样。通过条码技术等，可准确跟踪货物的流向，实现货物的可追溯。\n" +
            "智能化仓储管理系统与ERP系统对接后，从生产计划的制定开始到下达货物的出入库指令，可实现全流程自动化作业，且系统自动过账，保证信息准确及时，避免账实不同步的问题，切实提高仓库的管理水平。"
    }
]
</script>

<template>
    <div>
        <div class="header-title">
            <img src="https://www.neusoft.com/cn/upload/2023v1/assets/img/grid-1.jpg" alt="show" class="show-img">
        </div>
        <div class="sec">
            <img src="https://www.neusoft.com/cn/upload/img/about/part-4-pic-1.jpg" alt="p1" class="pic">
            <div class="desc">
                <div class="title">{{ p[0].title }}</div>
                <div class="text">
                    {{ p[0].text }}
                </div>
            </div>
        </div>
        <div class="sec">
            <div class="desc">
                <div class="title">{{ p[1].title }}</div>
                <div class="text">
                    {{ p[0].text }}
                </div>
            </div>
            <img src="https://www.neusoft.com/cn/upload/2023v1/assets/img/corp-app-3.webp" alt="p2" class="pic">
        </div>
    </div>
</template>

<style lang="less" scoped>

.header-title {
    display: flex;
    justify-content: center;
    background-color: #008fd3;
    background-image: url("https://www.neusoft.com/cn/upload/img/goods/pic-1.png");
    background-repeat: no-repeat;
    margin-bottom: 40px;

    .show-img {
        display: block;
        height: 500px;
        margin-left: 250px;
    }

    text-align: center;
}

.sec {
    border-bottom: 1px #ccc solid;
    padding-bottom: 40px;
    padding-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1200px;
    margin: 0 auto;

    .pic {
        height: 400px;
    }

    .desc {
        padding: 0 30px;

        .title {
            text-align: center;
            font-size: 25px;
            padding-bottom: 10px;
        }

        .text {
            text-indent: 36px;
            width: 800px;
            font-size: 18px;
        }
    }
}


</style>