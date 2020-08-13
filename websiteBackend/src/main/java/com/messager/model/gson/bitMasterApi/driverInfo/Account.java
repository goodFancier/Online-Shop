package com.messager.model.gson.bitMasterApi.driverInfo;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Account {

    @SerializedName("account_kind")
    @Expose
    private Integer accountKind;
    @SerializedName("balance")
    @Expose
    private Float balance;

    public Integer getAccountKind() {
        return accountKind;
    }

    public void setAccountKind(Integer accountKind) {
        this.accountKind = accountKind;
    }

    public Float getBalance() {
        return balance;
    }

    public void setBalance(Float balance) {
        this.balance = balance;
    }

}
