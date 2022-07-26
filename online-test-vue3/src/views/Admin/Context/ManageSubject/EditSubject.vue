<template>
    <div id="add-subject">
        <v-row justify="center">
            <v-col cols="12" sm="9" md="8" lg="6">
                <v-card ref="form">
                    <v-card-text >
                        <v-text-field
                                v-model="name"
                                label="学科名称"
                                required
                        ></v-text-field>
                        <v-divider class="mt-12"></v-divider>
                        <!--            操作-->
                        <v-card-actions>
                            <v-btn @click="clear">重置</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click="submit">提交</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        created() {
            this.search();
        },
        data() {
            return {
             name:''
            };
        },
        methods: {
            async search(){
                // 获取学科数据
                let res=await this.$api.SelSubject(this.$route.params.id)
                this.name=res.data.name;
            },
            clear(){
               this.name=''
            },
            async submit() {
                this.createUser=this.$store.state.user.id;
                let res=await this.$api.UpdateSubject(this.$route.params.id,{
                  name:this.name
                })
                console.log(res);
                if(res.code===200){
                    this.$message.success(`${res.msg}`);
                    //   返回到‘学科列表’页面
                    this.$router.push({ path: "/layout/subject" });
                }else {
                    this.$message.error("提交失败，请检查网络！");
                }
            },
        }
    };
</script>

<style scoped></style>
