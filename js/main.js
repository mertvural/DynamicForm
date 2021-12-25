var vue = new Vue({
    el: "#app",
    data: {
        formName: null,
        formTypes: false,
        formTypesOk: false,
        addFormType: true,
        activeFormId: null,
        textboxWrapper: false,
        isActive: true,
        checkSize: 1,
        editModalVisible: false,
        editTxt: null,
        editModalID: null,
        id: 0,
        sendName: "Gönder",
        viewer : true,
        datas: []
    },
    methods: {
        formTypeBtn() {
            this.formTypes = true
        },
        formElementBtn(el) {
            this.activeFormId = el
            this.formTypesOk = true;
        },
        moreCheckAdd() {
            this.checkSize++;
        },
        moreCheckDelete() {
            this.checkSize--;
        },
        editItem(id) {

            var [getID] = this.datas.filter(x => x.id === id);
            var val = getID.title;
            this.editModalID = getID.id;
            this.editTxt = val;
            this.editModalVisible = true;

        },

        deleteItem(id) {

            var [getID] = this.datas.filter(x => x.id === id);

            arr = this.datas.filter(function (item) {
                return item !== getID
            })

            this.datas = arr

        },

        saveEditInput(changeTxt) {

            this.datas.map(x => x.id === this.editModalID ? x.title = changeTxt : "")
            setTimeout(() => {
                this.editModalVisible = false
            }, 200);
        },

        editModalClose() {
            this.editModalVisible = false
        },

        formTypeAdd() {
            var val = document.getElementById("addTitle").value,
                isRequire = document.getElementById("isRequireYes").checked;

            if (val <= 0) return
            switch (this.activeFormId) {
                case 1:
                    this.datas.push({
                        id: ++this.id,
                        title: val,
                        require: isRequire,
                        type: "text"
                    })
                    break;

                case 2:
                    this.datas.push({
                        id: ++this.id,
                        title: val,
                        require: isRequire,
                        type: "textarea"
                    })
                    break;
                case 3:
                    var self = this;
                    var valRadio;
                    var radioElements = []
                    document.querySelectorAll(".form-control-radio").forEach(function (el) {
                        valRadio = el.value;
                        radioElements.push(valRadio);
                    })
                    self.datas.push({
                        id: ++self.id,
                        title: val,
                        require: isRequire,
                        type: "radio",
                        data: radioElements
                    })
                    break;

                case 4:
                    var self = this;
                    var valCheck;
                    var checkElements = []
                    document.querySelectorAll(".form-control-checkbox").forEach(function (el) {
                        valCheck = el.value;
                        checkElements.push(valCheck);
                    })
                    self.datas.push({
                        id: ++self.id,
                        title: val,
                        type: "checkbox",
                        require: isRequire,
                        data: checkElements
                    })
                    break;
                default:
                    break;
            }

            document.getElementById("addTitle").value = null

            var allRadioLabels = document.querySelectorAll('.form-control-radio, .form-control-checkbox');
            var myLength = allRadioLabels.length;
            for (var i = 0; i < myLength; ++i) {
                allRadioLabels[i].value = null;
            }



            //localStorage.setItem("allData", JSON.stringify(this.datas))

        }
    },
    created() {
        // var allData = JSON.parse(localStorage.getItem("allData"))      
        // !!allData ? this.datas = allData : ""              
    },
    mounted: function () {
        this.$nextTick(function () {
            new Sortable(dragArea, {
                handle: '.handle', // handle's class
                animation: 150
            });
        })
    }
})