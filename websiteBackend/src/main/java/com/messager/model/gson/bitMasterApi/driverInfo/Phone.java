package com.messager.model.gson.bitMasterApi.driverInfo;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Phone {

    @SerializedName("phone")
    @Expose
    private String phone;
    @SerializedName("is_default")
    @Expose
    private Boolean isDefault;
    @SerializedName("use_for_call")
    @Expose
    private Boolean useForCall;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Boolean getIsDefault() {
        return isDefault;
    }

    public void setIsDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }

    public Boolean getUseForCall() {
        return useForCall;
    }

    public void setUseForCall(Boolean useForCall) {
        this.useForCall = useForCall;
    }

}
