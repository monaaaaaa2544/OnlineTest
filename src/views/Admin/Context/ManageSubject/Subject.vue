<template>
    <div id="subject">
        <v-card-title>
            学科
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="table.search"
                    append-icon="mdi-magnify"
                    label="输入相关内容查询"
                    single-line
                    hide-details
            ></v-text-field>
            <router-link :to="{path:'/layout/subject/add'}">
                <v-btn class="ma-2" tile color="indigo" dark>新增学科</v-btn>
            </router-link>
        </v-card-title>
        <v-data-table
                :headers="table.headers"
                :items="table.desserts"
                :search="table.search"
                :items-per-page="20"
        >
            <!-- 操作 -->
            <template v-slot:item.action="slotScope">
                <router-link :to="{ path: '/layout/subject/edit/'+slotScope.item.id}">
                    <v-btn class="mr-2" color="primary" fab small>
                        编辑
                    </v-btn>
                </router-link>
                <v-btn class="mr-2" color="error" fab small dark @click="deleteSubject(slotScope.item.id)">
                        删除
                </v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>

    export default {
        created() {
            this.searchList();
        },
        data() {
            return {
                table: {
                    search: "",
                    headers: [
                        { text: "ID",  value: "id" },
                        { text: "用户名",  value: "name" },
                        { text: "操作", value: "action" },
                    ],
                    desserts: [],
                },
            };
        },
        methods: {
            searchList() {
                let d = [];
                this.$api.SubjectList().then(res => {
                    res.data.forEach((item, index) => {
                        d.push({
                            key: index,
                            id: item.id,
                            name: item.name
                        });
                    });
                    this.table.desserts = d;
                });
            },
            deleteSubject(id){
                this.$api.DelSubject(id).then(res=>{
                    console.log(res)
                    if(res.code===200){
                        this.$message.success('删除成功！')
                        this.searchList()
                    }
                }).catch(err=>console.log(err))
            }
        }
    };
</script>

<style scoped>
</style>
