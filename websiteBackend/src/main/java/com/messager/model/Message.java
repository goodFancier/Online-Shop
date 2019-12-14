package com.messager.model;

import com.messager.model.audit.DateAudit;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "messages")
public class Message extends DateAudit
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String messageText;

    @NotBlank
    private Long messageRecipient;

    @NotBlank
    private Long messageSender;

    public Message() {}

    public Message(@NotBlank String messageText, @NotBlank Long messageRecipient, @NotBlank Long messageSender)
    {
        this.messageText = messageText;
        this.messageRecipient = messageRecipient;
        this.messageSender = messageSender;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessageText()
    {
        return messageText;
    }

    public void setMessageText(String messageText)
    {
        this.messageText = messageText;
    }

    public Long getMessageRecipient()
    {
        return messageRecipient;
    }

    public void setMessageRecipient(Long messageRecipient)
    {
        this.messageRecipient = messageRecipient;
    }

    public Long getMessageSender()
    {
        return messageSender;
    }

    public void setMessageSender(Long messageSender)
    {
        this.messageSender = messageSender;
    }
}