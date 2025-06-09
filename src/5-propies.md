# 5. Definir excepcions pròpies

Quan desenvolupem programari, sobretot en desenvolupar les nostres pròpies classes, és habitual que es puguen produir excepcions que no estiguen definides dins del llenguatge. Per a crear una excepció pròpia hem de definir una classe derivada de la classe base *Exception*. L'ús d'aquesta nova excepció és el mateix que hem vist.

## 5.1. Exemple 6

Veurem un exemple senzill de definició i ús d'un nou tipus d'excepció anomenada ExcepcioPropia que utilitzarem quan a se li passe a ‘mètode’ un valor superior a 10.

::: tabs
== Java

```java
public class Exemple_excepcions{
  public static void main(String args[]){
    try{
      metode(1);
      metode(20)
    }catch (ExcepcioPropia e) {
      System.out.print("Capturada: " + e);
    }
  }
  static void metode(int n) throws ExcepcioPropia{
    System.out.print("Cridat per mètode(" + n + ")");
    if(n > 10)
      throw new ExcepcioPropia(n);
    
    System.out.println("Finalització normal.");
  }

}
```

:::

La definició de la nova excepció.

:::: tabs
=== Java

::: tabs
== Codi

```java
public class ExcepcioPropia extends Exception{
  private int num;
  ExcepcioPropia(int n){
    this.num = n;
  }

  public String toString(){
    return "Excepció pròpia[" + this.num + "]";
  }
}
```

== Eixida

```plaintext
Cridat pel mètode(1)
Finalització normal
Cridat pel mètode(20)
Capturada: Excepció pròpia[20]
```

:::
::::
