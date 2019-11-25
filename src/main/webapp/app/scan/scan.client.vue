<template>
<div class="layout">
    <Layout>
        <Header>
            <Select style="width:200px" @on-change="scannerChange">
                <Option v-for="item in onlineScanners" :value="item" :key="item">{{ item}}</Option>
            </Select>
            <Button @click="scan" :disabled="scanBtnDisabled">
                <span v-if="!scanning">扫描</span>
                <span v-else>扫描中...</span>
            </Button>
            <Button @click="reconnect">重连</Button>
            <Button @click="reset">扫描参数</Button>
            <Button @click="finish">结束</Button>
        </Header>
        <Content>
            <img :src="scanningImage" v-if="scanningImage">
        </Content>
        <Footer></Footer>
    </Layout>
</div>
</template>

<script lang="ts" src="./scan.client.component.ts">
</script>
