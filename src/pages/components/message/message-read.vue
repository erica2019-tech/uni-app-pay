<template>
	<view>
		<view class="example-title">已读信息列表</view>
		<uni-collapse ref="add" class="warp" @change="change">
			<uni-collapse-item v-for="(sub, key) in list" :key="key" :open="false" :show-animation="sub.showAnimation" :disabled="false" :note="sub.createDate" :title="sub.title" badgeType="warn">
				<template>
					<view class="content">{{ sub.content }}</view>
				</template>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import https from '../../../api/https.js'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			uniList,
			uniListItem
		},
		
		data() {
			return {
				list: [],
			}
		},
		onLoad() {
			https.get(`inform?status=read`).then(res=> {
				const {data} = res;
				this.list = data;
			})
		},
		methods: {

			change(e) {
				console.log(e)
			}
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx;
		position: relative;
		background-color: #fdfdfd
	}

	.example-title__after {
		position: relative;
		color: #031e3c
	}

	.example-title:after {
		content: '';
		position: absolute;
		left: 0;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 10upx;
		height: 40upx;
		border-top-right-radius: 10upx;
		border-bottom-right-radius: 10upx;
		background-color: #031e3c
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		border-top: 1px #f5f5f5 solid;
		padding: 30upx;
		background: #fff
	}

	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}

	.content {
		padding: 30upx;
		background: #f9f9f9;
		color: #666;
	}

	.button {
		font-size: 26upx;
		line-height: 90upx;
	}
</style>