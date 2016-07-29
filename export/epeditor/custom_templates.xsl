<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:template match="*[local-name()='feedback' and parent::*[local-name()='item']]" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wyjaśnienie'"/>
      </span>
   </xsl:template>    
	
	<xsl:template match="*[local-name()='feedback' and parent::*[local-name()='key'] and @correct='yes']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Komunikat - odpowiedź poprawna'"/>
      </span>
   </xsl:template>
   
    <xsl:template match="*[local-name()='feedback' and parent::*[local-name()='key'] and @correct='no']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Komunikat - odpowiedź błędna'"/>
      </span>
   </xsl:template>
   
      <xsl:template match="*[local-name()='hint' and parent::*[local-name()='answer']]" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wskazówka do odpowiedzi'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[local-name()='hint' and parent::*[local-name()='item']]" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wskazówka do pytania'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[local-name()='set' and parent::*[local-name()='item']]" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zestaw['"/>
		 <xsl:value-of select="./*[local-name()='answer'][1]/attribute::node()[local-name()='in-set'][1]"/>
		 <xsl:value-of select="']'"/>
      </span>
   </xsl:template>
   
</xsl:stylesheet>
