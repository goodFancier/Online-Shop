
package com.messager.model.gson.bitMasterApi.orderState;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class OrderState {

    @SerializedName("code")
    @Expose
    private Integer code;
    @SerializedName("descr")
    @Expose
    private String descr;
    @SerializedName("data")
    @Expose
    private Data data;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

}
