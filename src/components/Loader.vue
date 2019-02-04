<template>
    <div class="loader">
    </div>
</template>

<script>
export default {
    name: 'Loader',
    props: [],
    mounted() {
		this.load();
    },
    data() {
			return {
								
			}
    },
    methods: {
			load: function(){
				this.$content.load().then(() => {
				}).catch((err) => {
					console.log(err);
					if(!this.$content.loadLocal()){
						setTimeout(this.load(), 10000);
					}
				});
			}
    },
}
</script>
