package com.messager.model.enumdto;

public enum GoodChangeable
{
    CHANGEABLE("Можно обменять"), UNCHANGEABLE("Нельзя обменять");

    GoodChangeable(String title)
    {
        this.title = title;
    }

    private String title;

    public String getTitle()
    {
        return title;
    }

    @Override
    public String toString()
    {
        return getTitle();
    }
}
