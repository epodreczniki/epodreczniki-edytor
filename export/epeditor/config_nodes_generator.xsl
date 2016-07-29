<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:x="http://www.xopus.com/xmlns/config"
    xmlns:m="http://www.w3.org/1998/Math/MathML"
    exclude-result-prefixes="xs"
    version="1.0">
    
    <xsl:output indent="yes" method="xml" omit-xml-declaration="yes"/>
    <xsl:strip-space elements="*"/>
    
    <xsl:variable name="vLower" select=
        "'abcdefghijklmnopqrstuvwxyz'"/>
    
    <xsl:variable name="vUpper" select=
        "'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
    
    <xsl:template match="locales">
        <x:nodes>
            <xsl:apply-templates/>
        </x:nodes>
    </xsl:template>

    <xsl:template match="locale">
        <xsl:element name="x:node">
            <xsl:attribute name="match">
                <xsl:value-of select="concat(@prefix, ':', @key)"/>
            </xsl:attribute>
            <xsl:element name="x:role">
                <xsl:value-of select="@key"/>
            </xsl:element>
            <xsl:element name="x:name">
                <xsl:attribute name="xml:lang">
                    <xsl:text>en</xsl:text>
                </xsl:attribute>
                <xsl:value-of select="concat(translate(substring(@key, 1, 1), $vLower, $vUpper), substring(@key, 2))"/>
            </xsl:element>
            <xsl:element name="x:name">
                <xsl:attribute name="xml:lang">
                    <xsl:text>pl</xsl:text>
                </xsl:attribute>
                <xsl:value-of select="text()"/>
            </xsl:element>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="xs:schema">
            <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="xs:element[@name]">
        <xsl:variable name="capitalizedName" select="concat(translate(substring(@name, 1, 1), $vLower, $vUpper), substring(@name, 2))"></xsl:variable>
        <xsl:element name="x:node">
            <xsl:attribute name="match">
                <xsl:value-of select="concat('m', ':', @name)"/>
            </xsl:attribute>
            <xsl:element name="x:role">
                <xsl:value-of select="@name"/>
            </xsl:element>
            <xsl:element name="x:role">
                <xsl:value-of select="'hidden-from-ui'"/>
            </xsl:element>
            <xsl:element name="x:name">
                <xsl:attribute name="xml:lang">
                    <xsl:text>en</xsl:text>
                </xsl:attribute>
                <xsl:value-of select="$capitalizedName"/>
            </xsl:element>
            <xsl:element name="x:name">
                <xsl:attribute name="xml:lang">
                    <xsl:text>pl</xsl:text>
                </xsl:attribute>
                <xsl:value-of select="'Mathml'"/>
            </xsl:element>
        </xsl:element>
        <xsl:element name="x:node">
            <xsl:attribute name="match">
                <xsl:value-of select="concat('m', ':', @name, '/@*')"/>
            </xsl:attribute>
            <xsl:element name="x:role">
                <xsl:value-of select="@name"/>
            </xsl:element>
            <xsl:element name="x:role">
                <xsl:value-of select="'hidden-from-ui'"/>
            </xsl:element>
            <xsl:element name="x:name">
                <xsl:attribute name="xml:lang">
                    <xsl:text>en</xsl:text>
                </xsl:attribute>
                <xsl:value-of select="$capitalizedName"/>
            </xsl:element>
            <xsl:element name="x:name">
                <xsl:attribute name="xml:lang">
                    <xsl:text>pl</xsl:text>
                </xsl:attribute>
                <xsl:value-of select="'Mathml'"/>
            </xsl:element>
        </xsl:element>
    </xsl:template>
</xsl:stylesheet>